import { Movie, MovieDetails } from '../entities/movie';
import { SearchResult } from '../entities/searchResult';
import { SearchFilters, DiscoverMovieFilters } from '../value-objects/searchFilters';

export interface MovieRepository {
  searchMovies(filters: SearchFilters): Promise<SearchResult<Movie>>;
  discoverMovies(filters: DiscoverMovieFilters): Promise<SearchResult<Movie>>;
  getMovieDetails(id: number): Promise<MovieDetails>;
  getPopularMovies(page?: number): Promise<SearchResult<Movie>>;
  getTopRatedMovies(page?: number): Promise<SearchResult<Movie>>;
  getUpcomingMovies(page?: number): Promise<SearchResult<Movie>>;
  getNowPlayingMovies(page?: number): Promise<SearchResult<Movie>>;
  getSimilarMovies(id: number, page?: number): Promise<SearchResult<Movie>>;
  getRecommendedMovies(id: number, page?: number): Promise<SearchResult<Movie>>;
}
