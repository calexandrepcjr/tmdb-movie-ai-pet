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
import { Movie } from '../../domain/entities/movie';

interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

function processMovieApiResponse(data: MovieApiResponse): Movie[] {
  return data.results;
}
```

### 3. **Use Union Types for Flexibility**
```typescript
// ✅ Good
import { Movie } from '../../domain/entities/movie';
import { TvShow } from '../../domain/entities/tvShow';
import { Person } from '../../domain/entities/person';

type SearchResultItem = Movie | TvShow | Person;

function handleSearchResultItem(item: SearchResultItem): void {
  if (item instanceof Movie) {
    console.log(`Movie: ${item.title}`);
  } else if (item instanceof TvShow) {
    console.log(`TV Show: ${item.name}`);
  } else if (item instanceof Person) {
    console.log(`Person: ${item.name}`);
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

// Methods and properties: camelCase
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
│   ├── movie.ts              # Rich domain Movie entity
│   ├── person.ts             # Rich domain Person entity
│   └── tvShow.ts             # Rich domain TvShow entity
├── repositories/
│   └── movieRepository.ts    # Interface definitions
└── value-objects/
    └── searchFilters.ts
```

### 4. **Import/Export Conventions**
```typescript
// Use explicit imports
import { Movie } from '../entities/movie';
import { SearchRequestDto } from '../dtos/searchRequestDto';

// Use named exports
export class MovieSearchUseCase {
  // implementation
}

// Use default exports sparingly (only for main components)
// export default class CliApplication {
//   // implementation
// }
```

## 🏗️ Architecture-Specific Guidelines

### Domain Layer

#### Entities
```typescript
// ✅ Good: Rich domain model with business logic
export class Movie {
  protected constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly overview: string,
    public readonly releaseDate: Date | null,
    public readonly posterPath: string | null,
    public readonly backdropPath: string | null,
    public readonly voteAverage: number,
    public readonly voteCount: number,
    public readonly popularity: number,
    public readonly adult: boolean,
    public readonly originalLanguage: string,
    public readonly originalTitle: string,
    public readonly genreIds: number[]
  ) {}

  public static create(data: any): Movie {
    const releaseDate = data.release_date ? new Date(data.release_date.replace(/-/g, '/')) : null;
    return new Movie(
      data.id,
      data.title,
      data.overview,
      releaseDate,
      data.poster_path,
      data.backdrop_path,
      data.vote_average,
      data.vote_count,
      data.popularity,
      !!data.adult,
      data.original_language,
      data.original_title,
      data.genre_ids || []
    );
  }

  public getPosterUrl(size: 'w500' | 'original' = 'w500'): string | null {
    if (!this.posterPath) {
      return null;
    }
    return `https://image.tmdb.org/t/p/${size}${this.posterPath}`;
  }

  public getBackdropUrl(size: 'w780' | 'original' = 'w780'): string | null {
    if (!this.backdropPath) {
      return null;
    }
    return `https://image.tmdb.org/t/p/${size}${this.backdropPath}`;
  }

  public getReleaseYear(): string {
    return this.releaseDate ? this.releaseDate.getFullYear().toString() : 'N/A';
  }

  public getFormattedVoteAverage(): string {
    return this.voteAverage.toFixed(1);
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
import { Movie, MovieDetails } from '../../../domain/entities/movie';
import { SearchResult } from '../../../domain/entities/searchResult';
import { SearchFilters } from '../../../domain/value-objects/searchFilters';
import { HttpClient as TmdbHttpClient } from '../../http/tmdb/httpClient';
import { AuthenticationError, InfrastructureError, RateLimitError } from '../../../domain/value-objects/errors';

interface TmdbSearchResponse {
  page: number;
  results: any[]; // Raw TMDB data
  total_pages: number;
  total_results: number;
}

export class TmdbMovieRepository {
  constructor(private readonly tmdbClient: TmdbHttpClient) {}

  async searchMovies(filters: SearchFilters): Promise<SearchResult<Movie>> {
    try {
      const params = {
        query: filters.query,
        page: filters.page || 1,
      };

      const tmdbResponse = await this.tmdbClient.get<TmdbSearchResponse>(
        "/search/movie",
        params
      );
      
      return {
        page: tmdbResponse.page,
        results: tmdbResponse.results.map(movieData => Movie.create(movieData)),
        totalPages: tmdbResponse.total_pages,
        totalResults: tmdbResponse.total_results,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    try {
      const movieDetailsData = await this.tmdbClient.get<any>(`/movie/${id}`);
      return MovieDetails.createDetails(movieDetailsData);
    } catch (error) {
      throw this.handleError(error);
    }
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
import { Movie } from '../../domain/entities/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const placeholderUrl = `https://placehold.co/500x750/374151/ffffff?text=${encodeURIComponent(movie.title)}`;
  const imageUrl = movie.getPosterUrl() || placeholderUrl;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderUrl;
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            {movie.getReleaseYear()}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3">
            {movie.overview}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-400 text-sm">
              ⭐ {movie.getFormattedVoteAverage()}
            </span>
            <span className="text-gray-400 text-xs">
              {movie.voteCount || 0} votes
            </span>
          </div>
        </div>
      </div>
    </Link>
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
import { Movie } from '../../domain/entities/movie';
import { MovieRepository } from '../../domain/repositories/movieRepository';
import { MovieSearchUseCase } from '../../application/use-cases/movieSearchUseCase';
import { SearchRequestDto } from '../../application/dtos/searchRequestDto';
import { SearchResult } from '../../domain/entities/searchResult';
import { ValidationError } from '../../domain/value-objects/errors';

describe('MovieSearchUseCase', () => {
  let useCase: MovieSearchUseCase;
  let mockRepository: jest.Mocked<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      searchMovies: jest.fn(),
      getMovieById: jest.fn(),
      getPopularMovies: jest.fn(),
      discoverMovies: jest.fn(),
      getMovieDetails: jest.fn(),
      getTopRatedMovies: jest.fn(),
      getUpcomingMovies: jest.fn(),
      getNowPlayingMovies: jest.fn(),
      getSimilarMovies: jest.fn(),
      getRecommendedMovies: jest.fn(),
    };
    useCase = new MovieSearchUseCase(mockRepository);
  });

  describe('execute', () => {
    it('should return search results when valid request is provided', async () => {
      // Arrange
      const request: SearchRequestDto = { query: 'Inception' };
      const mockMovieData = {
        id: 1,
        title: 'Inception',
        overview: 'A dream within a dream.',
        release_date: '2010-07-16',
        poster_path: '/inception.jpg',
        backdrop_path: '/inception_backdrop.jpg',
        vote_average: 8.8,
        vote_count: 30000,
        popularity: 123.45,
        adult: false,
        original_language: 'en',
        original_title: 'Inception',
        genre_ids: [1, 2],
      };
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
import { Movie } from '../../domain/entities/movie';

describe('Type Safety', () => {
  it('should enforce correct types', () => {
    // This will fail at compile time if types are wrong
    const movie = Movie.create({
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      release_date: '2023-01-01',
      vote_average: 8.5,
      popularity: 10.0,
      adult: false,
      original_language: 'en',
      original_title: 'Original Test Movie',
      genre_ids: [1, 2],
    });

    // TypeScript ensures these methods exist and return correct types
    const title: string = movie.title;
    const releaseYear: string = movie.getReleaseYear();
    const formattedVoteAverage: string = movie.getFormattedVoteAverage();
    const isAdult: boolean = movie.adult;
  });
});
```

## ⚡ Performance Considerations

### Lazy Loading
```typescript
// ✅ Good: Lazy loading for large objects
export class MovieDetails {
  // ... other properties
  private _credits?: any; // Assuming a Credits object

  async getCredits(): Promise<any> {
    if (!this._credits) {
      // In a real scenario, this would fetch from a repository
      this._credits = await Promise.resolve({ cast: [], crew: [] }); 
    }
    return this._credits;
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

  public withFilters(filters: SearchFilters): SearchRequest {
    return new SearchRequest(
      this.query,
      this.page,
      { ...this.filters, ...filters }
    );
  }

  public withPage(page: number): SearchRequest {
    return new SearchRequest(
      this.query,
      page,
      this.filters
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
import { Movie } from '../../domain/entities/movie';
import { TvShow } from '../../domain/entities/tvShow';
import { Person } from '../../domain/entities/person';
import { DomainError } from '../../domain/value-objects/errors';

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

*Last Updated: July 9, 2025*
