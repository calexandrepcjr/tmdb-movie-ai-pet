# ADR-010: Interface Naming Convention - No Hungarian Notation

## Status
**Accepted** - January 8, 2025

## Context
The codebase originally used Hungarian notation for interfaces, prefixing them with `I` (e.g., `IConfigService`, `IRepository`). This naming convention is a legacy practice that can reduce code readability and doesn't align with modern TypeScript and JavaScript best practices.

### Problems with Hungarian Notation
- **Redundant**: The `interface` keyword already indicates the type is an interface. For domain entities, we now use classes to encapsulate behavior, making the `I` prefix even more misleading.
- **Noise**: The `I` prefix adds visual noise without meaningful information
- **Inconsistency**: Modern TypeScript/JavaScript ecosystems favor descriptive names over type prefixes
- **Maintenance**: Renaming interfaces requires updating all references and import statements

## Decision
We will **remove Hungarian notation** from all interfaces and use descriptive, abstract English names instead.

### Naming Rules
- **DO NOT** use Hungarian notation with `I` prefix
- **DO** use descriptive, abstract English names that represent the concept
- **Focus** on what the interface represents, not its implementation

### Examples of Preferred Naming
| ❌ Hungarian Notation | ✅ Descriptive Name |
|----------------------|-------------------|
| `IConfigService` | `ConfigurationService` |
| `IRepository` | `DataRepository` |
| `IAuthProvider` | `AuthenticationProvider` |
| `ILogger` | `LoggingService` |
| `IHttpClient` | `HttpClient` |
| `ISearchService` | `SearchService` |

## Implementation
1. **Renamed** `IConfigService` to `ConfigurationService`
2. **Updated** all imports and usages across the codebase
3. **Updated** documentation, ADRs, and examples
4. **Added** explicit rule to TypeScript guidelines

### Files Changed
- `src/infrastructure/config/ConfigurationService.ts` (renamed from `IConfigService.ts`)
- `src/infrastructure/http/tmdb/TmdbHttpClient.ts`
- `src/infrastructure/di/DIConfiguration.ts`
- `src/presentation/browser/hooks/useMovieSearch.ts`
- `src/infrastructure/config/BrowserConfigService.ts`
- All documentation files with examples

## Consequences
### Positive
- **Improved readability**: Names are more descriptive and self-documenting
- **Better maintainability**: No need to remember arbitrary prefixing rules
- **Modern standards**: Aligns with contemporary TypeScript/JavaScript practices
- **Consistency**: Matches naming conventions used in popular libraries and frameworks

### Negative
- **Migration effort**: Required updating all existing references
- **Learning curve**: Developers familiar with Hungarian notation may need adjustment

## Compliance
This decision is enforced through:
- **TypeScript guidelines**: Explicit rule against Hungarian notation
- **Code reviews**: Reviewers should reject Hungarian notation in new code
- **Documentation**: All examples use descriptive naming
- **AI guidelines**: Copilot and Claude are instructed to avoid Hungarian notation
