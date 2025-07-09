export interface SearchResult<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export interface MultiSearchResult {
  id: number;
  mediaType: 'movie' | 'tv' | 'person';
  popularity: number;
  adult: boolean;
  // Movie specific fields
  title?: string;
  originalTitle?: string;
  releaseDate?: string;
  video?: boolean;
  // TV specific fields
  name?: string;
  originalName?: string;
  firstAirDate?: string;
  originCountry?: string[];
  // Person specific fields
  knownForDepartment?: string;
  knownFor?: Array<{
    id: number;
    mediaType: 'movie' | 'tv';
    title?: string;
    name?: string;
    originalTitle?: string;
    originalName?: string;
    overview: string;
    posterPath: string | null;
    backdropPath: string | null;
    genreIds: number[];
    popularity: number;
    voteAverage: number;
    voteCount: number;
    adult: boolean;
    originalLanguage: string;
    releaseDate?: string;
    firstAirDate?: string;
    video?: boolean;
    originCountry?: string[];
  }>;
  // Common fields
  overview?: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  profilePath?: string | null;
  genreIds?: number[];
  voteAverage?: number;
  voteCount?: number;
  originalLanguage?: string;
}

export interface TrendingResult {
  id: number;
  mediaType: 'movie' | 'tv' | 'person';
  popularity: number;
  adult: boolean;
  // Movie specific fields
  title?: string;
  originalTitle?: string;
  releaseDate?: string;
  video?: boolean;
  // TV specific fields
  name?: string;
  originalName?: string;
  firstAirDate?: string;
  originCountry?: string[];
  // Person specific fields
  knownForDepartment?: string;
  knownFor?: Array<any>;
  // Common fields
  overview?: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  profilePath?: string | null;
  genreIds?: number[];
  voteAverage?: number;
  voteCount?: number;
  originalLanguage?: string;
}
