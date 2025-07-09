import { SearchService } from '../../domain/services/searchService';
import { Movie, MovieDetails } from '../../domain/entities/movie';
import { SearchResult } from '../../domain/entities/searchResult';
import { SearchFilters, DiscoverMovieFilters } from '../../domain/value-objects/searchFilters';

export class MovieSearchUseCase {
  constructor(private searchService: SearchService) {}

  async searchMovies(query: string, page: number = 1, options?: Partial<SearchFilters>): Promise<SearchResult<Movie>> {
    const filters: SearchFilters = {
      query,
      page,
      ...options,
    };

    return await this.searchService.searchMovies(filters);
  }

  async discoverMovies(filters: DiscoverMovieFilters): Promise<SearchResult<Movie>> {
    return await this.searchService.discoverMovies(filters);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return await this.searchService.getMovieDetails(id);
  }

  async getPopularMovies(page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getPopularMovies(page);
  }

  async getTopRatedMovies(page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getTopRatedMovies(page);
  }

  async getUpcomingMovies(page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getUpcomingMovies(page);
  }

  async getNowPlayingMovies(page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getNowPlayingMovies(page);
  }

  async getSimilarMovies(id: number, page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getSimilarMovies(id, page);
  }

  async getRecommendedMovies(id: number, page: number = 1): Promise<SearchResult<Movie>> {
    return await this.searchService.getRecommendedMovies(id, page);
  }
}
