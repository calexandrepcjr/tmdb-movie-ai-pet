# System Architecture Overview

This document provides a comprehensive overview of the TMDB Movie Client architecture, design principles, and technical decisions.

## 🏗️ Architecture Overview

The TMDB Movie Client follows **Domain-Driven Design (DDD)** principles with **Clean Architecture** patterns to create a maintainable, testable, and scalable application.

### Core Principles

1. **Separation of Concerns**: Each layer has distinct responsibilities
2. **Dependency Inversion**: Dependencies point toward the domain
3. **Interface Segregation**: Minimal, focused interfaces
4. **Single Responsibility**: Each component has one reason to change
5. **Testability**: All components can be unit tested in isolation

## 🎯 Architectural Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │     CLI Interface   │    │   Browser Interface (React) │  │
│  │                     │    │                             │  │
│  │  - Commands         │    │  - Components               │  │
│  │  - User Interaction │    │  - Hooks                    │  │
│  │  - Output Formatting│    │  - Pages                    │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                         │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │     Use Cases       │    │         DTOs                │  │
│  │                     │    │                             │  │
│  │  - MovieSearchUseCase│    │  - SearchRequestDto        │  │
│  │  - PersonSearchUseCase│   │  - SearchResultDto         │  │
│  │  - TvShowSearchUseCase│   │  - Configuration DTOs      │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                            │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │     Entities        │    │    Value Objects            │  │
│  │                     │    │                             │  │
│  │  - Movie            │    │  - SearchFilters            │  │
│  │  - Person           │    │  - Errors                   │  │
│  │  - TvShow           │    │  - SearchResult             │  │
│  │  - SearchResult     │    │                             │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │  Repository Interfaces│  │    Domain Services          │  │
│  │                     │    │                             │  │
│  │  - MovieRepository  │    │  - SearchService            │  │
│  │  - PersonRepository │    │                             │  │
│  │  - TvShowRepository │    │                             │  │
│  │  - SearchRepository │    │                             │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                       │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │ Repository Impls    │    │    HTTP Clients             │  │
│  │                     │    │                             │  │
│  │  - TmdbMovieRepo    │    │  - TmdbHttpClient           │  │
│  │  - TmdbPersonRepo   │    │  - HttpClient               │  │
│  │  - TmdbTvShowRepo   │    │                             │  │
│  │  - TmdbSearchRepo   │    │                             │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────┐    ┌─────────────────────────────┐  │
│  │   Configuration     │    │  Dependency Injection       │  │
│  │                     │    │                             │  │
│  │  - ConfigService    │    │  - DIConfiguration          │  │
│  │  - BrowserConfigSvc │    │  - Container                │  │
│  └─────────────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── domain/                     # Domain Layer
│   ├── entities/              # Domain entities
│   │   ├── Movie.ts
│   │   ├── Person.ts
│   │   ├── TvShow.ts
│   │   └── SearchResult.ts
│   ├── repositories/          # Repository interfaces
│   │   ├── MovieRepository.ts
│   │   ├── PersonRepository.ts
│   │   ├── TvShowRepository.ts
│   │   └── SearchRepository.ts
│   ├── services/              # Domain services
│   │   └── SearchService.ts
│   └── value-objects/         # Value objects
│       ├── SearchFilters.ts
│       └── Errors.ts
├── application/               # Application Layer
│   ├── use-cases/            # Use cases
│   │   ├── MovieSearchUseCase.ts
│   │   ├── PersonSearchUseCase.ts
│   │   ├── TvShowSearchUseCase.ts
│   │   └── GeneralSearchUseCase.ts
│   └── dtos/                 # Data Transfer Objects
│       └── SearchRequestDto.ts
├── infrastructure/           # Infrastructure Layer
│   ├── repositories/        # Repository implementations
│   │   ├── TmdbMovieRepository.ts
│   │   ├── TmdbPersonRepository.ts
│   │   ├── TmdbTvShowRepository.ts
│   │   └── TmdbSearchRepository.ts
│   ├── http/                # HTTP clients
│   │   ├── HttpClient.ts
│   │   └── tmdb/
│   │       └── TmdbHttpClient.ts
│   ├── config/              # Configuration services
│   │   ├── ConfigService.ts      # CLI configuration
│   │   ├── BrowserConfigService.ts # Browser configuration
│   │   └── ConfigurationService.ts     # Configuration interface
│   └── di/                  # Dependency injection
│       ├── DIConfiguration.ts
│       └── Container.ts
└── presentation/            # Presentation Layer
    ├── cli/                 # CLI interface
    │   ├── CliApplication.ts
    │   └── commands/
    └── browser/             # Browser interface
        ├── App.tsx
        ├── components/
        │   ├── MovieCard.tsx
        │   ├── PersonCard.tsx
        │   ├── TvShowCard.tsx
        │   └── Navigation.tsx
        ├── hooks/
        │   └── useMovieSearch.ts
        └── pages/
            ├── HomePage.tsx
            ├── SearchPage.tsx
            ├── MovieDetailsPage.tsx
            ├── PersonDetailsPage.tsx
            └── TvShowDetailsPage.tsx
```

## 🔄 Data Flow

### Search Flow Example

```
1. User Input (Presentation Layer)
   │
   ├── CLI: Command line argument parsing
   └── Browser: Form submission or button click
   │
   ▼
2. Use Case Execution (Application Layer)
   │
   ├── MovieSearchUseCase.execute()
   ├── Input validation
   ├── DTO creation
   └── Repository call
   │
   ▼
3. Repository Interface (Domain Layer)
   │
   └── MovieRepository.searchMovies()
   │
   ▼
4. Repository Implementation (Infrastructure Layer)
   │
   ├── TmdbMovieRepository.searchMovies()
   ├── HTTP client usage
   ├── API authentication
   └── Data transformation
   │
   ▼
5. External API (TMDB)
   │
   └── HTTP request with query parameters
   │
   ▼
6. Response Processing (Infrastructure Layer)
   │
   ├── Error handling
   ├── Data mapping
   └── Domain entity creation
   │
   ▼
7. Result Return (Application Layer)
   │
   ├── Domain entities to DTOs
   └── Success/error response
   │
   ▼
8. Presentation (Presentation Layer)
   │
   ├── CLI: Console output formatting
   └── Browser: UI component updates
```

## 🔌 Dependency Injection

### Container Configuration

```typescript
// Dependency injection setup
export class DIConfiguration {
  static getContainer(): Container {
    const container = new Container();
    
    // Configuration
    container.register('ConfigService', () => new BrowserConfigService(), true);
    
    // HTTP clients
    container.register('HttpClient', () => new HttpClient(
      container.resolve('ConfigService')
    ), true);
    
    container.register('TmdbHttpClient', () => new TmdbHttpClient(
      container.resolve('HttpClient'),
      container.resolve('ConfigService')
    ), true);
    
    // Repositories
    container.register('MovieRepository', () => new TmdbMovieRepository(
      container.resolve('TmdbHttpClient')
    ), true);
    
    // Use cases
    container.register('MovieSearchUseCase', () => new MovieSearchUseCase(
      container.resolve('MovieRepository')
    ), true);
    
    return container;
  }
}
```

### Dependency Graph

```
ConfigService (Singleton)
    │
    ├── HttpClient (Singleton)
    │   │
    │   └── TmdbHttpClient (Singleton)
    │       │
    │       ├── TmdbMovieRepository (Singleton)
    │       ├── TmdbPersonRepository (Singleton)
    │       ├── TmdbTvShowRepository (Singleton)
    │       └── TmdbSearchRepository (Singleton)
    │           │
    │           ├── MovieSearchUseCase (Singleton)
    │           ├── PersonSearchUseCase (Singleton)
    │           ├── TvShowSearchUseCase (Singleton)
    │           └── GeneralSearchUseCase (Singleton)
    │
    └── Environment-specific services
```

## 🌐 Multi-Environment Support

### CLI Environment
- **Runtime**: Node.js
- **Configuration**: `.env` file with `TMDB_API_KEY`
- **Build**: TypeScript compilation
- **Entry Point**: `src/index.ts`

### Browser Environment
- **Runtime**: Web browser
- **Configuration**: `.env.browser` file with `BROWSER_APP_TMDB_API_KEY`
- **Build**: Webpack bundling
- **Entry Point**: `src/presentation/browser/index.tsx`

### Configuration Strategy

```typescript
// Common interface
interface ConfigurationService {
  getConfig(): Config;
  getApiKey(): string;
  // ... other methods
}

// CLI implementation
class ConfigService implements ConfigurationService {
  // Uses process.env directly
}

// Browser implementation
class BrowserConfigService implements ConfigurationService {
  // Uses webpack-injected environment variables
}
```

## 🔒 Security Considerations

### API Key Management
- **CLI**: Environment variables in `.env` file
- **Browser**: Webpack DefinePlugin injection
- **Authentication**: Query parameter (`api_key`)

### Input Validation
- **Domain Layer**: Business rule validation
- **Application Layer**: Input sanitization
- **Presentation Layer**: User input validation

### Error Handling
- **Domain Exceptions**: Business rule violations
- **Application Errors**: Use case failures
- **Infrastructure Errors**: External service failures

## 🧪 Testing Strategy

### Unit Testing
- **Domain Layer**: Pure business logic testing
- **Application Layer**: Use case testing with mocks
- **Infrastructure Layer**: Integration testing

### Test Structure
```
tests/
├── unit/
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── integration/
│   ├── api/
│   └── end-to-end/
└── fixtures/
    └── test-data/
```

### Mocking Strategy
- **Repository Interfaces**: Mock implementations
- **HTTP Clients**: Mock external API calls
- **Configuration**: Mock configuration values

## 📊 Performance Considerations

### Caching Strategy
- **Repository Level**: Response caching
- **Application Level**: Result memoization
- **Presentation Level**: Component optimization

### Resource Management
- **HTTP Connections**: Connection pooling
- **Memory Usage**: Object lifecycle management
- **Error Recovery**: Retry mechanisms

## 🚀 Scalability Patterns

### Horizontal Scaling
- **Stateless Design**: No server-side state
- **Repository Pattern**: Easy data source changes
- **Interface Segregation**: Minimal coupling

### Vertical Scaling
- **Lazy Loading**: On-demand resource loading
- **Batch Processing**: Bulk operations
- **Async Operations**: Non-blocking I/O

## 🔮 Future Considerations

### Potential Enhancements
- **Microservices**: Split into separate services
- **GraphQL**: More flexible API querying
- **Offline Support**: Local caching and sync
- **Real-time Updates**: WebSocket integration

### Migration Strategies
- **Database Support**: Add database persistence
- **Authentication**: User authentication system
- **Multi-tenant**: Support multiple API keys
- **Monitoring**: Add logging and metrics

---

*For more detailed information, see:*
- [Domain Design](./domain-design.md)
- [API Design](./api-design.md)
- [ADR Documentation](../adr/README.md)

*Last Updated: July 8, 2025*
