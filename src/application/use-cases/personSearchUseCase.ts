import { SearchService } from '../../domain/services/searchService';
import { Person } from '../../domain/entities/person';
import { SearchResult } from '../../domain/entities/searchResult';
import { SearchFilters } from '../../domain/value-objects/searchFilters';

export class PersonSearchUseCase {
  constructor(private searchService: SearchService) {}

  async searchPeople(query: string, page: number = 1, options?: Partial<SearchFilters>): Promise<SearchResult<Person>> {
    const filters: SearchFilters = {
      query,
      page,
      ...options,
    };

    return await this.searchService.searchPeople(filters);
  }

  async getPersonDetails(id: number): Promise<Person> {
    return await this.searchService.getPersonDetails(id);
  }

  async getPopularPeople(page: number = 1): Promise<SearchResult<Person>> {
    return await this.searchService.getPopularPeople(page);
  }

  async getPersonMovieCredits(id: number) {
    return await this.searchService.getPersonMovieCredits(id);
  }

  async getPersonTvCredits(id: number) {
    return await this.searchService.getPersonTvCredits(id);
  }
}
