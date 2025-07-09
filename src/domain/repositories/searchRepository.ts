import { MultiSearchResult, TrendingResult, SearchResult } from '../entities/searchResult';
import { SearchFilters, TimeWindow, MediaType } from '../value-objects/searchFilters';

export interface SearchRepository {
  multiSearch(filters: SearchFilters): Promise<SearchResult<MultiSearchResult>>;
  getTrending(mediaType: MediaType, timeWindow: TimeWindow, page?: number): Promise<SearchResult<TrendingResult>>;
}
