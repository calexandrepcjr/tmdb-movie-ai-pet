import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ConfigService } from '../config/configService';
import { ApiError, RateLimitError } from '../../domain/value-objects/errors';

export class HttpClient {
  private client: AxiosInstance;
  private configService: ConfigService;

  constructor() {
    this.configService = ConfigService.getInstance();
    this.client = this.createAxiosInstance();
  }

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

    // Request interceptor to add API key as query parameter
    instance.interceptors.request.use(
      (requestConfig) => {
        // Add API key as query parameter
        const url = new URL(requestConfig.url!, requestConfig.baseURL);
        url.searchParams.set('api_key', config.apiKey);
        requestConfig.url = url.pathname + url.search;
        
        console.log(`Making request to: ${requestConfig.url}`);
        return requestConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );

    return instance;
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          return new ApiError(status, 'Unauthorized: Invalid API key');
        case 404:
          return new ApiError(status, 'Resource not found');
        case 429:
          return new RateLimitError('Rate limit exceeded. Please try again later.');
        case 500:
          return new ApiError(status, 'Internal server error');
        default:
          return new ApiError(status, (data as any)?.status_message || 'An error occurred');
      }
    } else if (error.request) {
      return new ApiError(0, 'Network error: Unable to connect to TMDB API');
    } else {
      return new ApiError(0, `Request setup error: ${error.message}`);
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Method to build URL with parameters
  buildUrl(endpoint: string, params?: Record<string, any>): string {
    const defaultParams: Record<string, any> = {
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
}
