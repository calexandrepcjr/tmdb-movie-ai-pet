import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { HttpClient, HttpRequest, HttpResponse, HttpError, HttpClientConfig } from '../base/httpClient';

/**
 * Axios implementation of HttpClient
 * Follows Single Responsibility Principle
 */
export class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance;

  constructor(config: HttpClientConfig = {}) {
    this.client = this.createAxiosInstance(config);
  }

  private createAxiosInstance(config: HttpClientConfig): AxiosInstance {
    const instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...config.headers
      },
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.url}`);
        return config;
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

  private handleError(error: AxiosError): HttpError {
    if (error.response) {
      const { status, data, statusText } = error.response;
      return new HttpError(
        (data as any)?.status_message || statusText || 'An error occurred',
        status,
        {
          data: data as any,
          status,
          statusText,
          headers: error.response.headers as Record<string, string>
        }
      );
    } else if (error.request) {
      return new HttpError('Network error: Unable to connect to server', 0);
    } else {
      return new HttpError(`Request setup error: ${error.message}`, 0);
    }
  }

  async request<T = any>(request: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const response = await this.client.request({
        url: request.url,
        method: request.method,
        headers: request.headers,
        params: request.params,
        data: request.data,
        timeout: request.timeout
      });

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>
      };
    } catch (error) {
      throw error;
    }
  }

  async get<T = any>(url: string, params?: Record<string, string | number>, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      headers
    });
  }

  async post<T = any>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      headers
    });
  }

  async put<T = any>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      headers
    });
  }

  async delete<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      headers
    });
  }
}
