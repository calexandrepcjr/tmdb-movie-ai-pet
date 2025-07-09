import { SearchService } from '../../domain/services/searchService';
import { TvShow, TvShowDetails } from '../../domain/entities/tvShow';
import { SearchResult } from '../../domain/entities/searchResult';
import { SearchFilters, DiscoverTvFilters } from '../../domain/value-objects/searchFilters';

export class TvShowSearchUseCase {
  constructor(private searchService: SearchService) {}

  async searchTvShows(query: string, page: number = 1, options?: Partial<SearchFilters>): Promise<SearchResult<TvShow>> {
    const filters: SearchFilters = {
      query,
      page,
      ...options,
    };

    return await this.searchService.searchTvShows(filters);
  }

  async discoverTvShows(filters: DiscoverTvFilters): Promise<SearchResult<TvShow>> {
    return await this.searchService.discoverTvShows(filters);
  }

  async getTvShowDetails(id: number): Promise<TvShowDetails> {
    return await this.searchService.getTvShowDetails(id);
  }

  async getPopularTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getPopularTvShows(page);
  }

  async getTopRatedTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getTopRatedTvShows(page);
  }

  async getAiringTodayTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getAiringTodayTvShows(page);
  }

  async getOnTheAirTvShows(page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getOnTheAirTvShows(page);
  }

  async getSimilarTvShows(id: number, page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getSimilarTvShows(id, page);
  }

  async getRecommendedTvShows(id: number, page: number = 1): Promise<SearchResult<TvShow>> {
    return await this.searchService.getRecommendedTvShows(id, page);
  }
}
