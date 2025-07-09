import dotenv from 'dotenv';
import { ConfigurationError } from '../../domain/value-objects/errors';

dotenv.config();

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

export class ConfigService {
  private static instance: ConfigService;
  private config: TmdbConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadConfig(): TmdbConfig {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      throw new ConfigurationError('TMDB_API_KEY is required. Please set it in your .env file.');
    }

    return {
      apiKey,
      baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
      imageBaseUrl: process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/',
      defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en-US',
      defaultRegion: process.env.DEFAULT_REGION || 'US',
      defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE || '20', 10),
      timeout: parseInt(process.env.API_TIMEOUT || '10000', 10),
      retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3', 10),
      retryDelay: parseInt(process.env.RETRY_DELAY || '1000', 10),
    };
  }

  public getConfig(): TmdbConfig {
    return this.config;
  }

  public getApiKey(): string {
    return this.config.apiKey;
  }

  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  public getImageBaseUrl(): string {
    return this.config.imageBaseUrl;
  }

  public getFullImageUrl(path: string | null, size: string = 'w500'): string | null {
    if (!path) return null;
    return `${this.config.imageBaseUrl}${size}${path}`;
  }

  public getDefaultLanguage(): string {
    return this.config.defaultLanguage;
  }

  public getDefaultRegion(): string {
    return this.config.defaultRegion;
  }

  public getDefaultPageSize(): number {
    return this.config.defaultPageSize;
  }
}
