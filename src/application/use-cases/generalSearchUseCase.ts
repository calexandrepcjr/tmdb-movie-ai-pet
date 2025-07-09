import { SearchService } from '../../domain/services/searchService';
import { MultiSearchResult, TrendingResult, SearchResult } from '../../domain/entities/searchResult';
import { SearchFilters, TimeWindow, MediaType } from '../../domain/value-objects/searchFilters';

export class GeneralSearchUseCase {
  constructor(private searchService: SearchService) {}

  async multiSearch(query: string, page: number = 1, options?: Partial<SearchFilters>): Promise<SearchResult<MultiSearchResult>> {
    const filters: SearchFilters = {
      query,
      page,
      ...options,
    };

    return await this.searchService.multiSearch(filters);
  }

  async getTrending(mediaType: MediaType, timeWindow: TimeWindow, page: number = 1): Promise<SearchResult<TrendingResult>> {
    return await this.searchService.getTrending(mediaType, timeWindow, page);
  }

  async getTrendingMovies(timeWindow: TimeWindow = TimeWindow.WEEK, page: number = 1): Promise<SearchResult<TrendingResult>> {
    return await this.searchService.getTrending(MediaType.MOVIE, timeWindow, page);
  }

  async getTrendingTvShows(timeWindow: TimeWindow = TimeWindow.WEEK, page: number = 1): Promise<SearchResult<TrendingResult>> {
    return await this.searchService.getTrending(MediaType.TV, timeWindow, page);
  }

  async getTrendingPeople(timeWindow: TimeWindow = TimeWindow.WEEK, page: number = 1): Promise<SearchResult<TrendingResult>> {
    return await this.searchService.getTrending(MediaType.PERSON, timeWindow, page);
  }

  async getTrendingAll(timeWindow: TimeWindow = TimeWindow.WEEK, page: number = 1): Promise<SearchResult<TrendingResult>> {
    return await this.searchService.getTrending(MediaType.ALL, timeWindow, page);
  }
}
