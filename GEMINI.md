# Gemini Code-Gen Agent Instructions

This document provides specific instructions for the Gemini code-generation agent to ensure its contributions align with the project's architecture, coding standards, and development practices.

## 🏛️ Core Architecture: Domain-Driven Design (DDD) + Clean Architecture

The project follows a strict **Clean Architecture** pattern combined with **Domain-Driven Design (DDD)**. All generated code must adhere to these principles.

### Architectural Layers & Dependency Rule

Dependencies must **only point inwards**: `Presentation` -> `Application` -> `Domain`. The `Infrastructure` layer implements interfaces defined in the `Domain` and `Application` layers.

1.  **`domain`**: Contains the core business logic, entities, value objects, and repository *interfaces*. It has **no external dependencies**.
2.  **`application`**: Contains use cases that orchestrate the domain logic. It depends only on the `domain` layer.
3.  **`infrastructure`**: Contains implementations of repositories, HTTP clients, and other external-facing services. It implements interfaces from the `domain` and `application` layers.
4.  **`presentation`**: The UI layer (CLI and Browser). It depends on the `application` layer's use cases.

**Key ADRs to reference:**
*   [ADR-001: Domain-Driven Design](./docs/adr/001-domain-driven-design.md)
*   [ADR-002: Clean Architecture](./docs/adr/002-clean-architecture.md)

### Data Flow Example (Search)

1.  **`Presentation`**: A React component calls a `useMovieSearch` hook.
2.  **`Application`**: The hook invokes the `MovieSearchUseCase`.
3.  **`Domain`**: The use case calls the `MovieRepository` *interface*.
4.  **`Infrastructure`**: The `TmdbMovieRepository` (implementation) makes an HTTP call via `TmdbHttpClient`.
5.  **`Infrastructure`**: The repository maps the API response to `domain` entities.
6.  **`Application`**: The use case returns the result to the presentation layer.

## 💻 TypeScript Coding Standards

All code must be written in **TypeScript** with `strict` mode enabled.

### Naming Conventions

*   **Files**: `camelCase` for all `.ts` files (e.g., `movieRepository.ts`).
    *   **Exception**: `PascalCase` for `.tsx` React components (e.g., `MovieCard.tsx`).
*   **Interfaces**: `PascalCase`. **DO NOT** use the `I` prefix (e.g., `ConfigurationService`, not `IConfigService`).
*   **Classes & Types**: `PascalCase` (e.g., `MovieSearchUseCase`, `SearchResult`).
*   **Methods & Variables**: `camelCase` (e.g., `searchMovies`, `apiKey`).
*   **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`).

**Key ADRs to reference:**
*   [ADR-010: Interface Naming Convention](./docs/adr/010-interface-naming-convention.md)
*   [ADR-011: File Naming Convention](./docs/adr/011-file-naming-convention.md)

### Type Safety

*   **NO `any`**: Avoid the `any` type. Use specific types, `unknown`, or generics.
*   **Immutability**: Prefer immutable data structures, especially in the domain layer. Use `readonly` where possible.
*   **Union Types**: Use union types and type guards for handling different states or types (e.g., `type Status = 'loading' | 'success' | 'error'`).

## ⚙️ Key Technical Decisions & Patterns

### Dependency Injection (DI)

*   A lightweight DI container is used to manage dependencies.
*   Configuration is centralized in `src/infrastructure/di/diConfiguration.ts`.
*   When adding a new service or repository, register it in the DI container.
*   **ADR Reference**: [ADR-004: Dependency Injection](./docs/adr/004-dependency-injection.md)

### Configuration

*   The application supports multiple environments (CLI and Browser).
*   Configuration is managed through a `ConfigurationService` interface.
*   Implementations (`ConfigService` for CLI, `BrowserConfigService` for Browser) provide environment-specific values.
*   **ADR Reference**: [ADR-009: Environment Configuration](./docs/adr/009-environment-configuration.md)

### TMDB API Authentication

*   Authentication is done via an `api_key` **query parameter**, not a Bearer token.
*   The `TmdbHttpClient` is responsible for adding the API key to every request.
*   **ADR Reference**: [ADR-007: TMDB API Authentication](./docs/adr/007-tmdb-api-authentication.md)

### Error Handling

*   A structured error hierarchy is used (`AppError` -> `DomainError`, `ApplicationError`, `InfrastructureError`).
*   Throw specific, custom errors from each layer (e.g., `ValidationError` from `domain`, `AuthenticationError` from `infrastructure`).
*   Handle errors gracefully in the `application` and `presentation` layers.

## 🤖 AI Agent Prompting Guidelines

When interacting with this codebase, please follow these prompting best practices.

### 1. Always Provide Context

Start your prompts by establishing the architectural context.

**Example Prompt:**
> "I am working on a TypeScript project using Domain-Driven Design and Clean Architecture. I need to add a feature to fetch TV show details. Please generate the necessary code, following the existing patterns for movies."

### 2. Be Specific About the Layer

Specify which architectural layer you are working in.

**Example Prompt:**
> "In the **domain layer**, create a `TvShow` entity. It should have properties for `id`, `name`, `overview`, and `firstAirDate`. Include a business logic method `isPopular()` that returns true if the vote average is above 7.5. Follow the pattern of the existing `Movie` entity."

### 3. Reference Existing Patterns

Refer to existing files or patterns to ensure consistency.

**Example Prompt:**
> "Create a `TmdbTvShowRepository` in the **infrastructure layer**. It must implement the `TvShowRepository` interface and use the `TmdbHttpClient` for data fetching, similar to the `TmdbMovieRepository`."

### 4. Follow Naming and Coding Standards

Explicitly ask the agent to follow the project's conventions.

**Example Prompt:**
> "Generate a new use case named `TvShowDetailsUseCase`. Ensure the file is named `tvShowDetailsUseCase.ts` (camelCase) and the class is `TvShowDetailsUseCase` (PascalCase). All interfaces it depends on should not have an 'I' prefix."

### 5. Request Complete and Tested Code

Ask for complete code units, including error handling and tests.

**Example Prompt:**
> "Generate the `TvShowDetailsUseCase`, including comprehensive error handling for not-found scenarios. Also, create a basic Jest unit test file for this use case, mocking the `TvShowRepository` dependency."
