import { PersonRepository as DomainPersonRepository } from "../../../domain/repositories/personRepository";
import {
  Person,
  PersonMovieCredits,
  PersonTvCredits,
} from "../../../domain/entities/person";
import { SearchResult } from "../../../domain/entities/searchResult";
import { SearchFilters } from "../../../domain/value-objects/searchFilters";
import { HttpClient } from "../../http/tmdb/httpClient";
import { BaseRepository, SearchableRepository } from "../base/baseRepository";

/**
 * TMDB Person Repository
 * Follows Single Responsibility Principle and implements proper error handling
 */
export class PersonRepository
  extends BaseRepository<Person>
  implements
    DomainPersonRepository,
    SearchableRepository<Person, SearchFilters>
{
  private tmdbClient: HttpClient;

  constructor(tmdbClient: HttpClient) {
    super();
    this.tmdbClient = tmdbClient;
  }

  async findById(id: number): Promise<Person | null> {
    try {
      const personData = await this.tmdbClient.get<any>(`/person/${id}`);
      return Person.create(personData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<Person[]> {
    try {
      const result = await this.tmdbClient.get<SearchResult<any>>(
        "/person/popular"
      );
      return result.results.map(person => Person.create(person));
    } catch (error) {
      this.handleError(error);
    }
  }

  async search(query: string, filters?: SearchFilters): Promise<Person[]> {
    try {
      const result = await this.searchPeople(filters || { query });
      return result.results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchPeople(filters: SearchFilters): Promise<SearchResult<Person>> {
    try {
      const params = {
        query: filters.query,
        page: filters.page || 1,
        include_adult: filters.includeAdult || false,
        language: filters.language || "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/search/person",
        params
      );

      return {
        ...response,
        results: response.results.map(person => Person.create(person)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonDetails(id: number): Promise<Person> {
    try {
      const params = {
        language: "en-US",
      };

      const personData = await this.tmdbClient.get<any>(`/person/${id}`, params);
      return Person.create(personData);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularPeople(page: number = 1): Promise<SearchResult<Person>> {
    try {
      const params = {
        page,
        language: "en-US",
      };

      const response = await this.tmdbClient.get<SearchResult<any>>(
        "/person/popular",
        params
      );

      return {
        ...response,
        results: response.results.map(person => Person.create(person)),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonMovieCredits(id: number): Promise<PersonMovieCredits> {
    try {
      const params = {
        language: "en-US",
      };

      return await this.tmdbClient.get<PersonMovieCredits>(
        `/person/${id}/movie_credits`,
        params
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonTvCredits(id: number): Promise<PersonTvCredits> {
    try {
      const params = {
        language: "en-US",
      };

      return await this.tmdbClient.get<PersonTvCredits>(
        `/person/${id}/tv_credits`,
        params
      );
    } catch (error) {
      this.handleError(error);
    }
  }
}
