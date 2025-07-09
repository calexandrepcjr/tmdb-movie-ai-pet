# TMDB Movie Client - Project Structure

This project follows Domain-Driven Design (DDD) principles with a clean architecture approach.

## Complete Folder Structure

```
tmdb-movie-client/
├── .env                                    # Environment variables
├── .env.example                            # Environment template
├── .gitignore                              # Git ignore rules
├── README.md                               # Project documentation
├── package.json                            # NPM configuration
├── tsconfig.json                           # TypeScript configuration
├── .vscode/
│   └── tasks.json                          # VS Code tasks
├── dist/                                   # Compiled JavaScript (generated)
└── src/
    ├── index.ts                            # Main entry point
    ├── TestSetup.ts                        # Setup verification script
    │
    ├── domain/                             # Domain Layer (Business Logic)
    │   ├── entities/                       # Business entities
    │   │   ├── Movie.ts                    # Movie entity and related types
    │   │   ├── TvShow.ts                   # TV Show entity and related types
    │   │   ├── Person.ts                   # Person entity and related types
    │   │   └── SearchResult.ts             # Search result entities
    │   ├── value-objects/                  # Value objects and domain types
    │   │   ├── SearchFilters.ts            # Search filter types and enums
    │   │   └── Errors.ts                   # Domain error types
    │   ├── repositories/                   # Repository interfaces
    │   │   ├── MovieRepository.ts          # Movie repository contract
    │   │   ├── TvShowRepository.ts         # TV Show repository contract
    │   │   ├── PersonRepository.ts         # Person repository contract
    │   │   └── SearchRepository.ts         # Search repository contract
    │   └── services/                       # Domain services
    │       └── SearchService.ts            # Search domain service
    │
    ├── application/                        # Application Layer (Use Cases)
    │   ├── use-cases/                      # Application use cases
    │   │   ├── MovieSearchUseCase.ts       # Movie search use case
    │   │   ├── TvShowSearchUseCase.ts      # TV show search use case
    │   │   ├── PersonSearchUseCase.ts      # Person search use case
    │   │   └── GeneralSearchUseCase.ts     # General search use case
    │   └── dtos/                           # Data Transfer Objects
    │       └── searchRequestDto.ts         # Search request/response DTOs
    │
    ├── infrastructure/                     # Infrastructure Layer (External)
    │   ├── config/                         # Configuration management
    │   │   └── ConfigService.ts            # Configuration service
    │   ├── http/                           # HTTP client
    │   │   └── HttpClient.ts               # HTTP client wrapper
    │   └── repositories/                   # Repository implementations
    │       ├── TmdbMovieRepository.ts      # TMDB Movie repository
    │       ├── TmdbTvShowRepository.ts     # TMDB TV Show repository
    │       ├── TmdbPersonRepository.ts     # TMDB Person repository
    │       └── TmdbSearchRepository.ts     # TMDB Search repository
    │
    └── presentation/                       # Presentation Layer (UI)
        ├── cli/                            # CLI application
        │   └── CliApplication.ts           # Main CLI application
        ├── controllers/                    # Request controllers
        │   └── SearchController.ts         # Search controller
        ├── formatters/                     # Output formatters
        │   └── ViewFormatter.ts            # Console output formatter
        └── interactive/                    # Interactive mode
            └── InteractiveMenu.ts          # Interactive menu system
```

## Layer Responsibilities

### Domain Layer (`src/domain/`)
- **Purpose**: Contains the core business logic and rules
- **Dependencies**: None (depends on nothing)
- **Components**:
  - **Entities**: Core business objects (Movie, TvShow, Person)
  - **Value Objects**: Immutable objects and enums (SearchFilters, Errors)
  - **Repositories**: Contracts for data access (interfaces only)
  - **Services**: Domain logic that doesn't belong to entities

### Application Layer (`src/application/`)
- **Purpose**: Orchestrates business operations and use cases
- **Dependencies**: Domain layer only
- **Components**:
  - **Use Cases**: Application-specific business rules
  - **DTOs**: Data contracts between layers

### Infrastructure Layer (`src/infrastructure/`)
- **Purpose**: External concerns and technical details
- **Dependencies**: Domain and Application layers
- **Components**:
  - **Config**: Configuration management
  - **HTTP**: External API communication
  - **Repositories**: Concrete implementations of domain contracts

### Presentation Layer (`src/presentation/`)
- **Purpose**: User interface and input/output handling
- **Dependencies**: All layers
- **Components**:
  - **CLI**: Command-line interface
  - **Controllers**: Request handling and response formatting
  - **Formatters**: Output formatting and display
  - **Interactive**: Interactive user interface

## Key Design Principles

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Single Responsibility**: Each class has one reason to change
3. **Open/Closed**: Open for extension, closed for modification
4. **Interface Segregation**: Clients don't depend on unused interfaces
5. **Dependency Injection**: Dependencies are injected, not created

## Data Flow

```
CLI Input → Controller → Use Case → Domain Service → Repository → HTTP Client → TMDB API
                                                                            ↓
Console Output ← Formatter ← Controller ← Use Case ← Domain Service ← Repository ← HTTP Client
```

## Benefits of This Architecture

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Changes in one layer don't affect others
3. **Scalability**: Easy to add new features or change implementations
4. **Flexibility**: Can easily swap implementations (e.g., different APIs)
5. **Separation of Concerns**: Each layer has a clear responsibility

## Adding New Features

To add a new feature (e.g., movie reviews):

1. **Domain**: Add Review entity and repository interface
2. **Application**: Create ReviewUseCase
3. **Infrastructure**: Implement TmdbReviewRepository
4. **Presentation**: Add review commands to CLI and controller

This structure ensures that business logic remains isolated from technical concerns and can evolve independently.
