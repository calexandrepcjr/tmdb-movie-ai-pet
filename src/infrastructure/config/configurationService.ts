export interface TmdbConfig {
  apiKey: string;
  baseUrl: string;
  imageBaseUrl: string;
  defaultLanguage: string;
  defaultRegion: string;
  defaultPageSize: number;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface ConfigurationService {
  getConfig(): TmdbConfig;
  getApiKey(): string;
  getBaseUrl(): string;
  getImageBaseUrl(): string;
  getFullImageUrl(path: string | null, size?: string): string | null;
  getDefaultLanguage(): string;
  getDefaultRegion(): string;
  getDefaultPageSize(): number;
  getTimeout(): number;
  getRetryAttempts(): number;
  getRetryDelay(): number;
}
