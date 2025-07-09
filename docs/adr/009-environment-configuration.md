# ADR-009: Implement Environment-Specific Configuration

## Status
Accepted

## Context
The application needs to run in different environments (CLI vs. Browser) with different configuration requirements. The CLI runs in Node.js with access to file system and environment variables, while the browser runs in a sandboxed environment with limited access to system resources.

## Decision
We will implement environment-specific configuration services that share a common interface but have different implementations:

- **CLI Environment**: Uses Node.js `process.env` and file system access
- **Browser Environment**: Uses webpack-injected environment variables and browser-compatible APIs

## Consequences

### Positive Consequences
- **Environment Isolation**: Each environment gets appropriate configuration
- **Shared Interface**: Common contract for all environments
- **Type Safety**: TypeScript interfaces ensure consistent configuration
- **Flexibility**: Easy to add new environments or configuration sources
- **Security**: Browser environment doesn't expose sensitive CLI configurations

### Negative Consequences
- **Code Duplication**: Similar configuration logic in multiple places
- **Build Complexity**: Different build processes for different environments
- **Testing Complexity**: Need to test configuration in multiple environments

## Implementation

### Common Interface
```typescript
export interface ConfigurationService {
  getConfig(): Config;
  getApiKey(): string;
  getBaseUrl(): string;
  getDefaultLanguage(): string;
  getDefaultRegion(): string;
  // ... other methods
}

export interface Config {
  apiKey: string;
  baseUrl: string;
  imageBaseUrl: string;
  defaultLanguage: string;
  defaultRegion: string;
  // ... other properties
}
```

### CLI Configuration Service
```typescript
export class ConfigService implements ConfigurationService {
  private loadConfig(): TmdbConfig {
    const apiKey = process.env.TMDB_API_KEY;
    
    if (!apiKey) {
      throw new ConfigurationError('TMDB_API_KEY is required. Please set it in your .env file.');
    }
    
    return {
      apiKey,
      baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
      // ... other configurations
    };
  }
}
```

### Browser Configuration Service
```typescript
export class BrowserConfigService implements ConfigurationService {
  private loadConfig(): TmdbConfig {
    // Environment variables are injected by webpack DefinePlugin
    const apiKey = process.env.BROWSER_APP_TMDB_API_KEY;
    
    if (!apiKey) {
      throw new ConfigurationError('BROWSER_APP_TMDB_API_KEY is required. Please set it in your .env.browser file.');
    }
    
    return {
      apiKey,
      baseUrl: process.env.BROWSER_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
      // ... other configurations
    };
  }
}
```

### Dependency Injection Configuration
```typescript
// CLI DI Configuration
export class DIConfiguration {
  static getContainer(): Container {
    const container = new Container();
    
    container.register('ConfigService', () => new ConfigService(), true);
    // ... other registrations
    
    return container;
  }
}

// Browser DI Configuration
export class DIConfiguration {
  static getContainer(): Container {
    const container = new Container();
    
    container.register('ConfigService', () => new BrowserConfigService(), true);
    // ... other registrations
    
    return container;
  }
}
```

### Environment Files
```bash
# .env (CLI)
TMDB_API_KEY=your-api-key-here
TMDB_BASE_URL=https://api.themoviedb.org/3

# .env.browser (Browser)
BROWSER_APP_TMDB_API_KEY=your-api-key-here
BROWSER_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## Alternatives Considered
- **Single Configuration Service**: Would require runtime environment detection
- **Environment Variables Only**: Less flexible for complex configurations
- **Configuration Files**: Would require build-time processing

## Related ADRs
- [ADR-005: Support Multiple Presentation Layers](./005-multiple-presentation-layers.md)
- [ADR-006: Adopt Browser-Centric Naming Convention](./006-browser-environment-naming.md)
- [ADR-008: Use Webpack for Browser Build System](./008-webpack-build-system.md)

---

**Date:** 2025-07-08
**Author:** Development Team
**Reviewers:** Architecture Review
