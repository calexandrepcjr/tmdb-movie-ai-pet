import { Person, PersonMovieCredits, PersonTvCredits } from '../entities/person';
import { SearchResult } from '../entities/searchResult';
import { SearchFilters } from '../value-objects/searchFilters';

export interface PersonRepository {
  searchPeople(filters: SearchFilters): Promise<SearchResult<Person>>;
  getPersonDetails(id: number): Promise<Person>;
  getPopularPeople(page?: number): Promise<SearchResult<Person>>;
  getPersonMovieCredits(id: number): Promise<PersonMovieCredits>;
  getPersonTvCredits(id: number): Promise<PersonTvCredits>;
}
