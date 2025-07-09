import { TvShow, TvShowDetails } from '../entities/tvShow';
import { SearchResult } from '../entities/searchResult';
import { SearchFilters, DiscoverTvFilters } from '../value-objects/searchFilters';

export interface TvShowRepository {
  searchTvShows(filters: SearchFilters): Promise<SearchResult<TvShow>>;
  discoverTvShows(filters: DiscoverTvFilters): Promise<SearchResult<TvShow>>;
  getTvShowDetails(id: number): Promise<TvShowDetails>;
  getPopularTvShows(page?: number): Promise<SearchResult<TvShow>>;
  getTopRatedTvShows(page?: number): Promise<SearchResult<TvShow>>;
  getAiringTodayTvShows(page?: number): Promise<SearchResult<TvShow>>;
  getOnTheAirTvShows(page?: number): Promise<SearchResult<TvShow>>;
  getSimilarTvShows(id: number, page?: number): Promise<SearchResult<TvShow>>;
  getRecommendedTvShows(id: number, page?: number): Promise<SearchResult<TvShow>>;
}
