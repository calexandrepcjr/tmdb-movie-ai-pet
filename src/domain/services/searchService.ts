import { MovieRepository } from '../repositories/movieRepository';
import { TvShowRepository } from '../repositories/tvShowRepository';
import { PersonRepository } from '../repositories/personRepository';
import { SearchRepository } from '../repositories/searchRepository';
import { Movie, MovieDetails } from '../entities/movie';
import { TvShow, TvShowDetails } from '../entities/tvShow';
import { Person } from '../entities/person';
import { SearchResult, MultiSearchResult, TrendingResult } from '../entities/searchResult';
import { SearchFilters, DiscoverMovieFilters, DiscoverTvFilters, TimeWindow, MediaType } from '../value-objects/searchFilters';

export class SearchService {
  constructor(
    private movieRepository: MovieRepository,
    private tvShowRepository: TvShowRepository,
    private personRepository: PersonRepository,
    private searchRepository: SearchRepository
  ) {}

  async searchMovies(filters: SearchFilters): Promise<SearchResult<Movie>> {
    return this.movieRepository.searchMovies(filters);
  }

  async searchTvShows(filters: SearchFilters): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.searchTvShows(filters);
  }

  async searchPeople(filters: SearchFilters): Promise<SearchResult<Person>> {
    return this.personRepository.searchPeople(filters);
  }

  async multiSearch(filters: SearchFilters): Promise<SearchResult<MultiSearchResult>> {
    return this.searchRepository.multiSearch(filters);
  }

  async discoverMovies(filters: DiscoverMovieFilters): Promise<SearchResult<Movie>> {
    return this.movieRepository.discoverMovies(filters);
  }

  async discoverTvShows(filters: DiscoverTvFilters): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.discoverTvShows(filters);
  }

  async getTrending(mediaType: MediaType, timeWindow: TimeWindow, page?: number): Promise<SearchResult<TrendingResult>> {
    return this.searchRepository.getTrending(mediaType, timeWindow, page);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.movieRepository.getMovieDetails(id);
  }

  async getTvShowDetails(id: number): Promise<TvShowDetails> {
    return this.tvShowRepository.getTvShowDetails(id);
  }

  async getPersonDetails(id: number): Promise<Person> {
    return this.personRepository.getPersonDetails(id);
  }

  async getPopularMovies(page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getPopularMovies(page);
  }

  async getTopRatedMovies(page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getTopRatedMovies(page);
  }

  async getUpcomingMovies(page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getUpcomingMovies(page);
  }

  async getNowPlayingMovies(page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getNowPlayingMovies(page);
  }

  async getPopularTvShows(page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getPopularTvShows(page);
  }

  async getTopRatedTvShows(page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getTopRatedTvShows(page);
  }

  async getAiringTodayTvShows(page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getAiringTodayTvShows(page);
  }

  async getOnTheAirTvShows(page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getOnTheAirTvShows(page);
  }

  async getPopularPeople(page?: number): Promise<SearchResult<Person>> {
    return this.personRepository.getPopularPeople(page);
  }

  async getSimilarMovies(id: number, page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getSimilarMovies(id, page);
  }

  async getRecommendedMovies(id: number, page?: number): Promise<SearchResult<Movie>> {
    return this.movieRepository.getRecommendedMovies(id, page);
  }

  async getSimilarTvShows(id: number, page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getSimilarTvShows(id, page);
  }

  async getRecommendedTvShows(id: number, page?: number): Promise<SearchResult<TvShow>> {
    return this.tvShowRepository.getRecommendedTvShows(id, page);
  }

  async getPersonMovieCredits(id: number) {
    return this.personRepository.getPersonMovieCredits(id);
  }

  async getPersonTvCredits(id: number) {
    return this.personRepository.getPersonTvCredits(id);
  }
}
