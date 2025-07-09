import { MovieRepository as DomainMovieRepository } from "../../../domain/repositories/movieRepository";
import { Movie, MovieDetails } from "../../../domain/entities/movie";
import { SearchResult } from "../../../domain/entities/searchResult";
import {
  SearchFilters,
  DiscoverMovieFilters,
} from "../../../domain/value-objects/searchFilters";
import { HttpClient as TmdbHttpClient } from "../../http/tmdb/httpClient";
import {
  BaseRepository,
  PaginatedRepository,
  SearchableRepository,
} from "../base/baseRepository";

interface TmdbMovieResponse {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number | null;
  vote_count: number | null;
}

interface TmdbSearchResponse {
  page: number;
  results: TmdbMovieResponse[];
  total_pages: number;
  total_results: number;
}

interface TmdbMovieDetailsResponse extends TmdbMovieResponse {
  budget: number;
  genres: TmdbGenre[];
  homepage: string;
  imdb_id: string;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: TmdbSpokenLanguage[];
  status: string;
  tagline: string;
  belongs_to_collection: TmdbCollection | null;
}

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface TmdbProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TmdbSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface TmdbCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * TMDB Movie Repository
 * Follows Single Responsibility Principle and implements proper error handling
 */
export class MovieRepository
  extends BaseRepository<Movie>
  implements
    DomainMovieRepository,
    SearchableRepository<Movie, SearchFilters>,
    PaginatedRepository<Movie, DiscoverMovieFilters>
{
  private tmdbClient: TmdbHttpClient;

  constructor(tmdbClient: TmdbHttpClient) {
    super();
    this.tmdbClient = tmdbClient;
  }

  private mapTmdbMovieToMovie(tmdbMovie: TmdbMovieResponse): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      overview: tmdbMovie.overview,
      releaseDate: tmdbMovie.release_date,
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
      genreIds: tmdbMovie.genre_ids,
      popularity: tmdbMovie.popularity,
      voteAverage: tmdbMovie.vote_average ?? 0,
      voteCount: tmdbMovie.vote_count ?? 0,
      adult: tmdbMovie.adult,
      originalLanguage: tmdbMovie.original_language,
      video: tmdbMovie.video,
    };
  }

  private mapTmdbSearchResponse(tmdbResponse: TmdbSearchResponse): SearchResult<Movie> {
    return {
      page: tmdbResponse.page,
      results: tmdbResponse.results.map(movie => this.mapTmdbMovieToMovie(movie)),
      totalPages: tmdbResponse.total_pages,
      totalResults: tmdbResponse.total_results,
    };
  }

  private mapTmdbMovieDetailsToMovieDetails(tmdbMovieDetails: TmdbMovieDetailsResponse): MovieDetails {
    return {
      ...this.mapTmdbMovieToMovie(tmdbMovieDetails),
      budget: tmdbMovieDetails.budget,
      genres: tmdbMovieDetails.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
      })),
      homepage: tmdbMovieDetails.homepage,
      imdbId: tmdbMovieDetails.imdb_id,
      productionCompanies: tmdbMovieDetails.production_companies.map(company => ({
        id: company.id,
        name: company.name,
        logoPath: company.logo_path,
        originCountry: company.origin_country,
      })),
      productionCountries: tmdbMovieDetails.production_countries.map(country => ({
        iso31661: country.iso_3166_1,
        name: country.name,
      })),
      revenue: tmdbMovieDetails.revenue,
      runtime: tmdbMovieDetails.runtime,
      spokenLanguages: tmdbMovieDetails.spoken_languages.map(language => ({
        englishName: language.english_name,
        iso6391: language.iso_639_1,
        name: language.name,
      })),
      status: tmdbMovieDetails.status,
      tagline: tmdbMovieDetails.tagline,
      belongsToCollection: tmdbMovieDetails.belongs_to_collection ? {
        id: tmdbMovieDetails.belongs_to_collection.id,
        name: tmdbMovieDetails.belongs_to_collection.name,
        posterPath: tmdbMovieDetails.belongs_to_collection.poster_path,
        backdropPath: tmdbMovieDetails.belongs_to_collection.backdrop_path,
      } : null,
    };
  }

  async findById(id: number): Promise<MovieDetails | null> {
    try {
      const movie = await this.tmdbClient.get<MovieDetails>(`/movie/${id}`);
      return movie;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<Movie[]> {
    try {
      const result = await this.tmdbClient.get<SearchResult<Movie>>(
        "/movie/popular"
      );
      return result.results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(query: string, filters?: SearchFilters): Promise<Movie[]> {
    try {
      const result = await this.searchMovies(filters || { query });
      return result.results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchMovies(filters: SearchFilters): Promise<SearchResult<Movie>> {
    try {
      const params = {
        query: filters.query,
        page: filters.page || 1,
        include_adult: filters.includeAdult || false,
        region: filters.region,
        year: filters.year,
        primary_release_year: filters.primaryReleaseYear,
        language: filters.language,
      };

      const tmdbResponse = await this.tmdbClient.get<TmdbSearchResponse>(
        "/search/movie",
        params
      );
      
      return this.mapTmdbSearchResponse(tmdbResponse);
    } catch (error) {
      this.handleError(error);
    }
  }

  async discoverMovies(
    filters: DiscoverMovieFilters
  ): Promise<SearchResult<Movie>> {
    try {
      const params = {
        page: filters.page || 1,
        language: filters.language,
        region: filters.region,
        sort_by: filters.sortBy,
        include_adult: filters.includeAdult || false,
        include_video: filters.includeVideo || false,
        primary_release_year: filters.primaryReleaseYear,
        "primary_release_date.gte": filters.primaryReleaseDateGte,
        "primary_release_date.lte": filters.primaryReleaseDateLte,
        "release_date.gte": filters.releaseDateGte,
        "release_date.lte": filters.releaseDateLte,
        with_release_type: filters.withReleaseType?.join("|"),
        year: filters.year,
        "vote_count.gte": filters.voteCountGte,
        "vote_count.lte": filters.voteCountLte,
        "vote_average.gte": filters.voteAverageGte,
        "vote_average.lte": filters.voteAverageLte,
        with_cast: filters.withCast,
        with_crew: filters.withCrew,
        with_people: filters.withPeople,
        with_companies: filters.withCompanies,
        with_genres: filters.withGenres,
        without_genres: filters.withoutGenres,
        with_keywords: filters.withKeywords,
        without_keywords: filters.withoutKeywords,
        with_runtime_gte: filters.withRuntimeGte,
        with_runtime_lte: filters.withRuntimeLte,
        with_original_language: filters.withOriginalLanguage,
        watch_region: filters.watchRegion,
        with_watch_providers: filters.withWatchProviders,
        with_watch_monetization_types:
          filters.withWatchMonetizationTypes?.join("|"),
      };

      return await this.tmdbClient.get<SearchResult<Movie>>(
        "/discover/movie",
        params
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: DiscoverMovieFilters
  ): Promise<any> {
    try {
      const discoverFilters = {
        page,
        ...filters,
      };

      const result = await this.discoverMovies(discoverFilters);
      return {
        results: result.results,
        page: result.page,
        totalPages: result.totalPages,
        totalResults: result.totalResults,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularMovies(page: number = 1): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>("/movie/popular", {
        page,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopRatedMovies(page: number = 1): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>(
        "/movie/top_rated",
        { page }
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUpcomingMovies(page: number = 1): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>("/movie/upcoming", {
        page,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async getNowPlayingMovies(page: number = 1): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>(
        "/movie/now_playing",
        { page }
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    try {
      return await this.tmdbClient.get<MovieDetails>(`/movie/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieCredits(id: number): Promise<any> {
    try {
      return await this.tmdbClient.get(`/movie/${id}/credits`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieVideos(id: number): Promise<any> {
    try {
      return await this.tmdbClient.get(`/movie/${id}/videos`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieImages(id: number): Promise<any> {
    try {
      return await this.tmdbClient.get(`/movie/${id}/images`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieReviews(id: number, page: number = 1): Promise<any> {
    try {
      return await this.tmdbClient.get(`/movie/${id}/reviews`, { page });
    } catch (error) {
      this.handleError(error);
    }
  }

  async getSimilarMovies(
    id: number,
    page: number = 1
  ): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>(
        `/movie/${id}/similar`,
        { page }
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getRecommendedMovies(
    id: number,
    page: number = 1
  ): Promise<SearchResult<Movie>> {
    try {
      return await this.tmdbClient.get<SearchResult<Movie>>(
        `/movie/${id}/recommendations`,
        { page }
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
