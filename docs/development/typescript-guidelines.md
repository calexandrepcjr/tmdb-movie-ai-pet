# TypeScript Development Guidelines

This document outlines TypeScript best practices, coding standards, and conventions for the TMDB Movie Client project.

## 🎯 Overview

These guidelines ensure consistent, maintainable, and type-safe TypeScript code across the entire project, aligned with Domain-Driven Design and Clean Architecture principles.

## 📋 Table of Contents

1. [Type Safety Principles](#type-safety-principles)
2. [Coding Standards](#coding-standards)
3. [Architecture-Specific Guidelines](#architecture-specific-guidelines)
4. [Error Handling](#error-handling)
5. [Testing Guidelines](#testing-guidelines)
6. [Performance Considerations](#performance-considerations)
7. [Common Patterns](#common-patterns)

## 🛡️ Type Safety Principles

### 1. **Strict TypeScript Configuration**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 2. **Avoid `any` Type**
```typescript
// ❌ Bad
function processData(data: any): any {
  return data.someProperty;
}

// ✅ Good
interface ApiResponse {
  data: MovieData[];
  total: number;
}

function processData(data: ApiResponse): MovieData[] {
  return data.data;
}
```

### 3. **Use Union Types for Flexibility**
```typescript
// ✅ Good
type SearchResult = Movie | TvShow | Person;
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

function handleSearchResult(result: SearchResult): void {
  switch (result.type) {
    case 'movie':
      // TypeScript knows result is Movie
      break;
    case 'tv':
      // TypeScript knows result is TvShow
      break;
    case 'person':
      // TypeScript knows result is Person
      break;
  }
}
```

## 📝 Coding Standards

### 1. **Naming Conventions**
```typescript
// Interfaces: PascalCase with descriptive, abstract names
// DO NOT use Hungarian notation (I-prefix)
interface ConfigurationService {
  getConfig(): Config;
}

interface DataRepository {
  findById(id: string): Promise<Entity>;
}

// Classes: PascalCase
class MovieSearchUseCase {
  constructor(private movieRepository: MovieRepository) {}
}

// Methods and variables: camelCase
const apiKey = 'your-key';
function searchMovies(query: string): Promise<Movie[]> {}

// Constants: UPPER_SNAKE_CASE
const DEFAULT_PAGE_SIZE = 20;
const API_BASE_URL = 'https://api.themoviedb.org/3';

// Types and Enums: PascalCase
type SearchFilters = {
  genre?: string;
  year?: number;
};

enum MediaType {
  Movie = 'movie',
  TvShow = 'tv',
  Person = 'person'
}
```

#### Interface Naming Rules
- **DO NOT** use Hungarian notation with `I` prefix (e.g., `IConfigService`)
- **DO** use descriptive, abstract English names that represent the concept
- **Examples:**
  - `ConfigurationService` instead of `IConfigService`
  - `DataRepository` instead of `IRepository`
  - `AuthenticationProvider` instead of `IAuthProvider`
  - `LoggingService` instead of `ILogger`

### 2. **File Naming Convention**
All TypeScript files must use **camelCase** naming convention:

```
✅ Correct File Names:
- userService.ts
- movieRepository.ts  
- searchController.ts
- App.tsx (PascalCase for React components)
- MovieCard.tsx (PascalCase for React components)
- index.ts (exception for index files)

❌ Incorrect File Names:
- UserService.ts
- movie-repository.ts
- search_controller.ts
- app.tsx
- movie-card.tsx
```

#### File Naming Rules:
- **TypeScript files (`.ts`)**: Use camelCase
- **TSX files (`.tsx`)**: Use PascalCase (React components)
- **Index files**: Use lowercase `index.ts` or `index.tsx`
- **Config files**: Use camelCase for TypeScript configs

### 3. **File and Directory Structure**
```
domain/
├── entities/
│   ├── movie.ts              # camelCase for files
│   └── person.ts
├── repositories/
│   └── movieRepository.ts    # Interface definitions
└── value-objects/
    └── searchFilters.ts
```

### 4. **Import/Export Conventions**
```typescript
// Use explicit imports
import { Movie } from '../entities/Movie';
import { SearchRequestDto } from '../dtos/SearchRequestDto';

// Use named exports
export class MovieSearchUseCase {
  // implementation
}

// Use default exports sparingly (only for main components)
export default class CliApplication {
  // implementation
}
```

## 🏗️ Architecture-Specific Guidelines

### Domain Layer

#### Entities
```typescript
// ✅ Good: Rich domain model with business logic
export class Movie {
  private constructor(
    private readonly id: number,
    private readonly title: string,
    private readonly overview: string,
    private readonly releaseDate: Date,
    private readonly voteAverage: number,
    private readonly posterPath?: string
  ) {
    this.validateRating(voteAverage);
  }

  public static create(data: MovieData): Movie {
    return new Movie(
      data.id,
      data.title,
      data.overview,
      new Date(data.release_date),
      data.vote_average,
      data.poster_path
    );
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public hasHighRating(): boolean {
    return this.voteAverage >= 7.0;
  }

  private validateRating(rating: number): void {
    if (rating < 0 || rating > 10) {
      throw new DomainError('Rating must be between 0 and 10');
    }
  }
}
```

#### Repository Interfaces
```typescript
// ✅ Good: Clear contract with domain types
export interface MovieRepository {
  searchMovies(request: SearchRequestDto): Promise<SearchResult<Movie>>;
  getMovieById(id: number): Promise<Movie | null>;
  getPopularMovies(page?: number): Promise<SearchResult<Movie>>;
}

// Define clear DTOs
export interface SearchRequestDto {
  readonly query: string;
  readonly page?: number;
  readonly filters?: SearchFilters;
}

export interface SearchResult<T> {
  readonly results: T[];
  readonly totalResults: number;
  readonly totalPages: number;
  readonly currentPage: number;
}
```

### Application Layer

#### Use Cases
```typescript
// ✅ Good: Clear use case with proper error handling
export class MovieSearchUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(request: SearchRequestDto): Promise<SearchResult<Movie>> {
    this.validateRequest(request);
    
    try {
      const result = await this.movieRepository.searchMovies(request);
      return result;
    } catch (error) {
      if (error instanceof DomainError) {
        throw error;
      }
      throw new ApplicationError('Failed to search movies', error);
    }
  }

  private validateRequest(request: SearchRequestDto): void {
    if (!request.query || request.query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }

    if (request.page && request.page < 1) {
      throw new ValidationError('Page must be greater than 0');
    }
  }
}
```

### Infrastructure Layer

#### Repository Implementations
```typescript
// ✅ Good: Implements domain interface, handles external concerns
export class TmdbMovieRepository implements MovieRepository {
  constructor(private readonly httpClient: TmdbHttpClient) {}

  async searchMovies(request: SearchRequestDto): Promise<SearchResult<Movie>> {
    try {
      const response = await this.httpClient.get<TmdbSearchResponse>(
        '/search/movie',
        {
          query: request.query,
          page: request.page || 1,
          ...request.filters
        }
      );

      return this.mapToSearchResult(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private mapToSearchResult(response: TmdbSearchResponse): SearchResult<Movie> {
    return {
      results: response.results.map(movieData => Movie.create(movieData)),
      totalResults: response.total_results,
      totalPages: response.total_pages,
      currentPage: response.page
    };
  }

  private handleError(error: any): Error {
    if (error.status === 401) {
      throw new AuthenticationError('Invalid API key');
    }
    if (error.status === 429) {
      throw new RateLimitError('API rate limit exceeded');
    }
    throw new InfrastructureError('Failed to fetch movies', error);
  }
}
```

### Presentation Layer

#### React Components
```typescript
// ✅ Good: Properly typed React component
interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => {
  const handleClick = useCallback(() => {
    onMovieClick(movie.getId());
  }, [movie, onMovieClick]);

  return (
    <div className="movie-card" onClick={handleClick}>
      <h3>{movie.getTitle()}</h3>
      <p>{movie.getOverview()}</p>
      {movie.hasHighRating() && <span className="high-rating">⭐</span>}
    </div>
  );
};
```

## 🚨 Error Handling

### Error Hierarchy
```typescript
// Base error class
export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Domain errors
export class DomainError extends AppError {
  readonly code = 'DOMAIN_ERROR';
  readonly statusCode = 400;
}

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
}

// Application errors
export class ApplicationError extends AppError {
  readonly code = 'APPLICATION_ERROR';
  readonly statusCode = 500;
}

// Infrastructure errors
export class InfrastructureError extends AppError {
  readonly code = 'INFRASTRUCTURE_ERROR';
  readonly statusCode = 500;
}

export class AuthenticationError extends InfrastructureError {
  readonly code = 'AUTHENTICATION_ERROR';
  readonly statusCode = 401;
}
```

### Error Handling Patterns
```typescript
// ✅ Good: Proper error handling with types
async function searchMovies(query: string): Promise<Movie[] | null> {
  try {
    const useCase = container.resolve<MovieSearchUseCase>('MovieSearchUseCase');
    const result = await useCase.execute({ query });
    return result.results;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Invalid search query:', error.message);
      return null;
    }
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
      return null;
    }
    // Re-throw unknown errors
    throw error;
  }
}
```

## 🧪 Testing Guidelines

### Unit Test Structure
```typescript
// ✅ Good: Well-structured unit test
describe('MovieSearchUseCase', () => {
  let useCase: MovieSearchUseCase;
  let mockRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      searchMovies: jest.fn(),
      getMovieById: jest.fn(),
      getPopularMovies: jest.fn()
    };
    useCase = new MovieSearchUseCase(mockRepository);
  });

  describe('execute', () => {
    it('should return search results when valid request is provided', async () => {
      // Arrange
      const request: SearchRequestDto = { query: 'Inception' };
      const expectedResult: SearchResult<Movie> = {
        results: [Movie.create(mockMovieData)],
        totalResults: 1,
        totalPages: 1,
        currentPage: 1
      };
      mockRepository.searchMovies.mockResolvedValue(expectedResult);

      // Act
      const result = await useCase.execute(request);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockRepository.searchMovies).toHaveBeenCalledWith(request);
    });

    it('should throw ValidationError when query is empty', async () => {
      // Arrange
      const request: SearchRequestDto = { query: '' };

      // Act & Assert
      await expect(useCase.execute(request)).rejects.toThrow(ValidationError);
      expect(mockRepository.searchMovies).not.toHaveBeenCalled();
    });
  });
});
```

### Type Testing
```typescript
// ✅ Good: Testing types at compile time
describe('Type Safety', () => {
  it('should enforce correct types', () => {
    // This will fail at compile time if types are wrong
    const movie: Movie = Movie.create({
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      release_date: '2023-01-01',
      vote_average: 8.5
    });

    // TypeScript ensures these methods exist and return correct types
    const title: string = movie.getTitle();
    const hasHighRating: boolean = movie.hasHighRating();
  });
});
```

## ⚡ Performance Considerations

### Lazy Loading
```typescript
// ✅ Good: Lazy loading for large objects
export class MovieDetails {
  private _cast?: Person[];
  private _reviews?: Review[];

  async getCast(): Promise<Person[]> {
    if (!this._cast) {
      this._cast = await this.loadCast();
    }
    return this._cast;
  }

  async getReviews(): Promise<Review[]> {
    if (!this._reviews) {
      this._reviews = await this.loadReviews();
    }
    return this._reviews;
  }
}
```

### Immutability
```typescript
// ✅ Good: Immutable objects
export interface SearchFilters {
  readonly genre?: string;
  readonly year?: number;
  readonly rating?: number;
}

export class SearchRequest {
  constructor(
    public readonly query: string,
    public readonly page: number = 1,
    public readonly filters: SearchFilters = {}
  ) {}

  withFilters(filters: SearchFilters): SearchRequest {
    return new SearchRequest(
      this.query,
      this.page,
      { ...this.filters, ...filters }
    );
  }
}
```

## 🔄 Common Patterns

### Builder Pattern
```typescript
// ✅ Good: Builder for complex objects
export class SearchRequestBuilder {
  private query: string = '';
  private page: number = 1;
  private filters: SearchFilters = {};

  setQuery(query: string): this {
    this.query = query;
    return this;
  }

  setPage(page: number): this {
    this.page = page;
    return this;
  }

  setFilters(filters: SearchFilters): this {
    this.filters = { ...this.filters, ...filters };
    return this;
  }

  build(): SearchRequestDto {
    if (!this.query) {
      throw new ValidationError('Query is required');
    }
    return {
      query: this.query,
      page: this.page,
      filters: this.filters
    };
  }
}
```

### Factory Pattern
```typescript
// ✅ Good: Factory for creating related objects
export class EntityFactory {
  static createFromApiResponse(type: string, data: any): Movie | TvShow | Person {
    switch (type) {
      case 'movie':
        return Movie.create(data);
      case 'tv':
        return TvShow.create(data);
      case 'person':
        return Person.create(data);
      default:
        throw new DomainError(`Unknown entity type: ${type}`);
    }
  }
}
```

### Result Pattern
```typescript
// ✅ Good: Result pattern for error handling
export class Result<T, E = Error> {
  private constructor(
    private readonly value?: T,
    private readonly error?: E
  ) {}

  static success<T>(value: T): Result<T> {
    return new Result(value);
  }

  static failure<E>(error: E): Result<never, E> {
    return new Result(undefined, error);
  }

  isSuccess(): boolean {
    return this.error === undefined;
  }

  isFailure(): boolean {
    return this.error !== undefined;
  }

  getValue(): T {
    if (this.error) {
      throw this.error;
    }
    return this.value!;
  }

  getError(): E {
    return this.error!;
  }
}
```

## 📋 Code Review Checklist

### TypeScript Specific
- [ ] No `any` types used
- [ ] Proper interface definitions
- [ ] Correct generic usage
- [ ] Proper error handling
- [ ] Type guards where needed
- [ ] Immutable data structures

### Architecture Specific
- [ ] Correct layer placement
- [ ] Proper dependency direction
- [ ] Interface segregation
- [ ] Single responsibility
- [ ] Dependency injection usage

### Quality Checks
- [ ] Comprehensive JSDoc comments
- [ ] Unit tests for all public methods
- [ ] Error scenarios tested
- [ ] Performance considerations
- [ ] Security implications reviewed

---

*For more information, see:*
- [System Overview](../architecture/system-overview.md)
- [AI Development Guidelines](../ai/README.md)
- [ADR Documentation](../adr/README.md)

*Last Updated: July 8, 2025*
