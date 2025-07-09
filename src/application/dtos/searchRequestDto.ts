export interface MovieSearchRequestDto {
  query: string;
  page?: number;
  includeAdult?: boolean;
  region?: string;
  year?: number;
  primaryReleaseYear?: number;
  language?: string;
}

export interface MovieDiscoverRequestDto {
  page?: number;
  language?: string;
  region?: string;
  sortBy?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  releaseDateGte?: string;
  releaseDateLte?: string;
  withReleaseType?: number[];
  year?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  voteAverageGte?: number;
  voteAverageLte?: number;
  withCast?: string;
  withCrew?: string;
  withPeople?: string;
  withCompanies?: string;
  withGenres?: string;
  withoutGenres?: string;
  withKeywords?: string;
  withoutKeywords?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withOriginalLanguage?: string;
  withWatchProviders?: string;
  watchRegion?: string;
  withWatchMonetizationTypes?: string[];
  withoutCompanies?: string;
}

export interface TvShowSearchRequestDto {
  query: string;
  page?: number;
  includeAdult?: boolean;
  language?: string;
  firstAirDateYear?: number;
}

export interface TvShowDiscoverRequestDto {
  page?: number;
  language?: string;
  sortBy?: string;
  airDateGte?: string;
  airDateLte?: string;
  firstAirDateGte?: string;
  firstAirDateLte?: string;
  firstAirDateYear?: number;
  timezone?: string;
  voteAverageGte?: number;
  voteCountGte?: number;
  withGenres?: string;
  withNetworks?: string;
  withoutGenres?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  includeNullFirstAirDates?: boolean;
  withOriginalLanguage?: string;
  withoutKeywords?: string;
  screenedTheatrically?: boolean;
  withCompanies?: string;
  withKeywords?: string;
  withWatchProviders?: string;
  watchRegion?: string;
  withWatchMonetizationTypes?: string[];
  withStatus?: number[];
  withType?: number[];
  withoutCompanies?: string;
}

export interface PersonSearchRequestDto {
  query: string;
  page?: number;
  includeAdult?: boolean;
  language?: string;
}

export interface MultiSearchRequestDto {
  query: string;
  page?: number;
  includeAdult?: boolean;
  language?: string;
}

export interface TrendingRequestDto {
  mediaType: 'all' | 'movie' | 'tv' | 'person';
  timeWindow: 'day' | 'week';
  page?: number;
}

export interface PaginationDto {
  page: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchResultDto<T> {
  results: T[];
  pagination: PaginationDto;
}

export interface MovieResponseDto {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  genreIds: number[];
  popularity: number;
  voteAverage: number;
  voteCount: number;
  adult: boolean;
  originalLanguage: string;
  video: boolean;
  fullPosterUrl?: string;
  fullBackdropUrl?: string;
}

export interface TvShowResponseDto {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  firstAirDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  genreIds: number[];
  popularity: number;
  voteAverage: number;
  voteCount: number;
  adult: boolean;
  originalLanguage: string;
  originCountry: string[];
  fullPosterUrl?: string;
  fullBackdropUrl?: string;
}

export interface PersonResponseDto {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdbId: string;
  knownForDepartment: string;
  placeOfBirth: string | null;
  popularity: number;
  profilePath: string | null;
  adult: boolean;
  alsoKnownAs: string[];
  fullProfileUrl?: string;
}
