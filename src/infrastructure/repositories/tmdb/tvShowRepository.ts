import { TvShowRepository as DomainTvShowRepository } from "../../../domain/repositories/tvShowRepository";
import { TvShow, TvShowDetails } from "../../../domain/entities/tvShow";
import { SearchResult } from "../../../domain/entities/searchResult";
import {
  SearchFilters,
  DiscoverTvFilters,
} from "../../../domain/value-objects/searchFilters";
import { HttpClient } from "../../http/tmdb/httpClient";
import {
  BaseRepository,
  PaginatedRepository,
  SearchableRepository,
} from "../base/baseRepository";

/**
 * TMDB TV Show Repository
 * Follows Single Responsibility Principle and implements proper error handling
 */
export class TvShowRepository
  extends BaseRepository<TvShow>
  implements
    DomainTvShowRepository,
    SearchableRepository<TvShow, SearchFilters>,
    PaginatedRepository<TvShow, DiscoverTvFilters>
{
  private tmdbClient: HttpClient;

  constructor(tmdbClient: HttpClient) {
    super();
    this.tmdbClient = tmdbClient;
  }

  async findById(id: number): Promise<TvShowDetails | null> {
    try {
      const tvShowData = await this.tmdbClient.get<any>(`/tv/${id}`);
      return TvShowDetails.createDetails(tvShowData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<TvShow[]> {
    try {
      const result = await this.tmdbClient.get<SearchResult<any>>(
        "/tv/popular"
      );
      return result.results.map(tvShow => TvShow.create(tvShow));
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(query: string, filters?: SearchFilters): Promise<TvShow[]> {
    try {
      const result = await this.searchTvShows(filters || { query });
      return result.results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchTvShows(filters: SearchFilters): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        query: filters.query,
        page: filters.page || 1,
        include_adult: filters.includeAdult || false,
        language: filters.language || "en-US",
        first_air_date_year: filters.year,
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/search/tv",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async discoverTvShows(
    filters: DiscoverTvFilters
  ): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page: filters.page || 1,
        language: filters.language || "en-US",
        sort_by: filters.sortBy,
        "air_date.gte": filters.airDateGte,
        "air_date.lte": filters.airDateLte,
        "first_air_date.gte": filters.firstAirDateGte,
        "first_air_date.lte": filters.firstAirDateLte,
        first_air_date_year: filters.firstAirDateYear,
        timezone: filters.timezone,
        "vote_average.gte": filters.voteAverageGte,
        "vote_count.gte": filters.voteCountGte,
        with_genres: filters.withGenres,
        with_networks: filters.withNetworks,
        without_genres: filters.withoutGenres,
        "with_runtime.gte": filters.withRuntimeGte,
        "with_runtime.lte": filters.withRuntimeLte,
        include_null_first_air_dates: filters.includeNullFirstAirDates,
        with_original_language: filters.withOriginalLanguage,
        without_keywords: filters.withoutKeywords,
        screened_theatrically: filters.screened_theatrically,
        with_companies: filters.withCompanies,
        without_companies: filters.withoutCompanies,
        with_keywords: filters.withKeywords,
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/discover/tv",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTvShowDetails(id: number): Promise<TvShowDetails> {
    try {
      const tvShowData = await this.tmdbClient.get<any>(`/tv/${id}`);
      return TvShowDetails.createDetails(tvShowData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/tv/popular",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopRatedTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/tv/top_rated",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAiringTodayTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/tv/airing_today",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOnTheAirTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/tv/on_the_air",
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTvShowCredits(id: number): Promise<any> {
    try {
      return await this.tmdbClient.get<any>(`/tv/${id}/credits`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getSimilarTvShows(
    id: number,
    page: number = 1
  ): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        `/tv/${id}/similar`,
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getRecommendedTvShows(
    id: number,
    page: number = 1
  ): Promise<SearchResult<TvShow>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        `/tv/${id}/recommendations`,
        params
      );

      return {
        ...response,
        results: response.results.map(tvShow => TvShow.create(tvShow)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: DiscoverTvFilters
  ): Promise<{
    results: TvShow[];
    page: number;
    totalPages: number;
    totalResults: number;
  }> {
    try {
      const result = await this.discoverTvShows({ ...filters, page });
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

  async findByPage(
    page: number,
    filters?: DiscoverTvFilters
  ): Promise<SearchResult<TvShow>> {
    try {
      return await this.discoverTvShows({ ...filters, page });
    } catch (error) {
      this.handleError(error);
    }
  }
}
