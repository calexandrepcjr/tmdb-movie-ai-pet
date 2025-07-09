import { HttpClient as BaseHttpClient } from '../base/httpClient';
import { ConfigurationService } from '../../config/configurationService';
import { ApiError, RateLimitError } from '../../../domain/value-objects/errors';

/**
 * TMDB-specific HTTP client with API key authentication and error handling
 * Follows Single Responsibility Principle
 */
export class HttpClient {
  private httpClient: BaseHttpClient;
  private configService: ConfigurationService;

  constructor(httpClient: BaseHttpClient, configService: ConfigurationService) {
    this.httpClient = httpClient;
    this.configService = configService;
  }

  /**
   * Make a GET request to TMDB API
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const config = this.configService.getConfig();
      const url = this.buildUrl(endpoint, params);
      
      const response = await this.httpClient.get<T>(url, undefined, {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      return response.data;
    } catch (error: any) {
      throw this.handleTmdbError(error);
    }
  }

  /**
   * Make a POST request to TMDB API
   */
  async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
    try {
      const config = this.configService.getConfig();
      const url = this.buildUrl(endpoint, params);
      
      const response = await this.httpClient.post<T>(url, data, {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      return response.data;
    } catch (error: any) {
      throw this.handleTmdbError(error);
    }
  }

  /**
   * Build URL with default parameters
   */
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
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  /**
   * Handle TMDB-specific errors
   */
  private handleTmdbError(error: any): Error {
    if (error.status) {
      switch (error.status) {
        case 401:
          return new ApiError(error.status, 'Unauthorized: Invalid API key');
        case 404:
          return new ApiError(error.status, 'Resource not found');
        case 429:
          return new RateLimitError('Rate limit exceeded. Please try again later.');
        case 500:
          return new ApiError(error.status, 'Internal server error');
        default:
          return new ApiError(error.status, error.message || 'An error occurred');
      }
    } else if (error.message?.includes('Network error')) {
      return new ApiError(0, 'Network error: Unable to connect to TMDB API');
    } else {
      return new ApiError(0, error.message || 'An unknown error occurred');
    }
  }
}
