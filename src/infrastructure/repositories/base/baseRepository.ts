/**
 * Base Repository Interface
 * Follows Interface Segregation Principle
 */

export interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
}

export interface SearchableRepository<T, SearchParams = any> {
  search(query: string, params?: SearchParams): Promise<T[]>;
}

export interface PaginatedRepository<T, SearchParams = any> {
  findPaginated(page: number, limit: number, params?: SearchParams): Promise<PaginatedResult<T>>;
}

export interface PaginatedResult<T> {
  results: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}

/**
 * Abstract Base Repository
 * Implements common repository patterns
 */
export abstract class BaseRepository<T, ID = number> implements Repository<T, ID> {
  abstract findById(id: ID): Promise<T | null>;
  abstract findAll(): Promise<T[]>;

  protected handleError(error: any): never {
    console.error('Repository error:', error);
    throw error;
  }
}
