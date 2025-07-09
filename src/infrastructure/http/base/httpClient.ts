/**
 * Base HTTP Client Interface
 * Follows Interface Segregation Principle
 */

export interface HttpRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  data?: any;
  timeout?: number;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpClient {
  request<T = any>(request: HttpRequest): Promise<HttpResponse<T>>;
  get<T = any>(url: string, params?: Record<string, string | number>, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T = any>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  put<T = any>(url: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  delete<T = any>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class HttpError extends Error {
  constructor(
    public message: string,
    public status: number,
    public response?: HttpResponse
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
