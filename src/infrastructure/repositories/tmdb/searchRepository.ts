import { SearchRepository as ISearchRepository } from '../../../domain/repositories/searchRepository';
import { MultiSearchResult, TrendingResult, SearchResult, MultiResultFactory, TrendingResultFactory } from '../../../domain/entities/searchResult';
import { SearchFilters, TimeWindow, MediaType } from '../../../domain/value-objects/searchFilters';
import { HttpClient } from '../../http/tmdb/httpClient';

interface TmdbMultiSearchResponse {
  page: number;
  results: TmdbMultiSearchResult[];
  total_pages: number;
  total_results: number;
}

interface TmdbMultiSearchResult {
  id: number;
  media_type: string;
  adult?: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  // TV Show fields
  origin_country?: string[];
  original_name?: string;
  first_air_date?: string;
  name?: string;
  // Person fields
  known_for?: any[];
  known_for_department?: string;
  profile_path?: string | null;
  gender?: number;
}

interface TmdbTrendingResponse {
  page: number;
  results: TmdbTrendingResult[];
  total_pages: number;
  total_results: number;
}

interface TmdbTrendingResult {
  id: number;
  media_type: string;
  adult?: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  // TV Show fields
  origin_country?: string[];
  original_name?: string;
  first_air_date?: string;
  name?: string;
  // Person fields
  known_for?: any[];
  known_for_department?: string;
  profile_path?: string | null;
  gender?: number;
}

export class SearchRepository implements ISearchRepository {
  constructor(private httpClient: HttpClient) {}

  async multiSearch(filters: SearchFilters): Promise<SearchResult<MultiSearchResult>> {
    const params = {
      query: filters.query,
      page: filters.page || 1,
      include_adult: filters.includeAdult || false,
      language: filters.language,
    };

    const tmdbResponse = await this.httpClient.get<TmdbMultiSearchResponse>('/search/multi', params);
    
    return {
      page: tmdbResponse.page,
      results: tmdbResponse.results.map(result => MultiResultFactory.create(result)),
      totalPages: tmdbResponse.total_pages,
      totalResults: tmdbResponse.total_results,
    };
  }

  async getTrending(mediaType: MediaType, timeWindow: TimeWindow, page: number = 1): Promise<SearchResult<TrendingResult>> {
    const params = {
      page,
    };

    const tmdbResponse = await this.httpClient.get<TmdbTrendingResponse>(`/trending/${mediaType}/${timeWindow}`, params);
    
    return {
      page: tmdbResponse.page,
      results: tmdbResponse.results.map(result => TrendingResultFactory.create(result)),
      totalPages: tmdbResponse.total_pages,
      totalResults: tmdbResponse.total_results,
    };
  }
}
