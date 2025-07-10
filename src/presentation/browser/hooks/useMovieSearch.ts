import { useState } from 'react';
import { DIConfiguration } from '../../../infrastructure/di/diConfiguration';
import { MovieRepository } from '../../../infrastructure/repositories/tmdb/movieRepository';
import { TvShowRepository } from '../../../infrastructure/repositories/tmdb/tvShowRepository';
import { PersonRepository } from '../../../infrastructure/repositories/tmdb/personRepository';
import { SearchFilters } from '../../../domain/value-objects/searchFilters';
import { ConfigurationService } from '../../../infrastructure/config/configurationService';

/**
 * Custom hook for movie search operations
 * Uses dependency injection for better testability and loose coupling
 */
export const useMovieSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get services from DI container
  const movieRepository = DIConfiguration.getContainer().resolve<MovieRepository>('MovieRepository');
  const tvShowRepository = DIConfiguration.getContainer().resolve<TvShowRepository>('TvShowRepository');
  const personRepository = DIConfiguration.getContainer().resolve<PersonRepository>('PersonRepository');
  const configService = DIConfiguration.getContainer().resolve<ConfigurationService>('ConfigService');

  const checkApiKeyValid = () => {
    try {
      const config = configService.getConfig();
      return config.apiKey && config.apiKey !== 'your-api-key-here' && config.apiKey.trim() !== '';
    } catch {
      return false;
    }
  };

  const searchMovies = async (query: string, options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const filters: SearchFilters = {
        query,
        page: options?.page || 1,
      };
      
      const result = await movieRepository.searchMovies(filters);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while searching for movies';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const searchTvShows = async (query: string, options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const filters: SearchFilters = {
        query,
        page: options?.page || 1,
      };
      
      const result = await tvShowRepository.searchTvShows(filters);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while searching for TV shows';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const searchPeople = async (query: string, options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const filters: SearchFilters = {
        query,
        page: options?.page || 1,
      };
      
      const result = await personRepository.searchPeople(filters);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while searching for people';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getPopularMovies = async (options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await movieRepository.getPopularMovies(options?.page || 1);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching popular movies';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getPopularTvShows = async (options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await tvShowRepository.getPopularTvShows(options?.page || 1);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching popular TV shows';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getPopularPeople = async (options?: { page?: number }) => {
    if (!checkApiKeyValid()) {
      const errorMessage = 'TMDB API key is not configured. Please add your API key to .env file.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await personRepository.getPopularPeople(options?.page || 1);
      
      return { 
        success: true, 
        data: result
      };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching popular people';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    searchMovies,
    searchTvShows,
    searchPeople,
    getPopularMovies,
    getPopularTvShows,
    getPopularPeople,
    isApiKeyValid: checkApiKeyValid,
  };
};
