# ADR-007: Use Query Parameter Authentication for TMDB API

## Status
Accepted

## Context
The TMDB API supports multiple authentication methods, including API key as query parameter and Bearer token authentication. The initial implementation incorrectly used Bearer token authentication, which caused "Invalid API key" errors with valid API keys.

## Decision
We will use query parameter authentication for TMDB API calls, passing the API key as a query parameter rather than in the Authorization header.

## Consequences

### Positive Consequences
- **Correct Authentication**: Works with TMDB API as intended
- **Simpler Implementation**: No need to manage Authorization headers
- **Better Error Handling**: Clearer error messages for authentication issues
- **Documentation Alignment**: Follows TMDB API documentation examples

### Negative Consequences
- **URL Exposure**: API key visible in URL query parameters
- **Logging Concerns**: API key may appear in server logs
- **Less Secure**: Query parameters are less secure than headers

## Implementation
HTTP Client implementation:

```typescript
export class HttpClient {
  private createAxiosInstance(): AxiosInstance {
    const config = this.configService.getConfig();
    
    const instance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add API key as query parameter
    instance.interceptors.request.use(
      (requestConfig) => {
        const url = new URL(requestConfig.url!, requestConfig.baseURL);
        url.searchParams.set('api_key', config.apiKey);
        requestConfig.url = url.pathname + url.search;
        return requestConfig;
      }
    );

    return instance;
  }
}
```

TMDB HTTP Client implementation:

```typescript
export class TmdbHttpClient {
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const config = this.configService.getConfig();
    
    const defaultParams: Record<string, any> = {
      api_key: config.apiKey,
      language: this.configService.getDefaultLanguage(),
    };

    const mergedParams = { ...defaultParams, ...params };
    const searchParams = new URLSearchParams();

    Object.keys(mergedParams).forEach(key => {
      const value = mergedParams[key];
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    return `${endpoint}?${searchParams.toString()}`;
  }
}
```

## Alternatives Considered
- **Bearer Token Authentication**: Doesn't work with TMDB API keys
- **Basic Authentication**: Not supported by TMDB API
- **Header-based API Key**: Not the standard TMDB approach

## Related ADRs
- [ADR-009: Implement Environment-Specific Configuration](./009-environment-configuration.md)

---

**Date:** 2025-07-08
**Author:** Development Team
**Reviewers:** Architecture Review
