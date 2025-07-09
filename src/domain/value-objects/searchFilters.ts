export interface SearchFilters {
  query?: string;
  page?: number;
  includeAdult?: boolean;
  region?: string;
  year?: number;
  primaryReleaseYear?: number;
  language?: string;
}

export interface DiscoverMovieFilters {
  page?: number;
  language?: string;
  region?: string;
  sortBy?: SortBy;
  includeAdult?: boolean;
  includeVideo?: boolean;
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  releaseDateGte?: string;
  releaseDateLte?: string;
  withReleaseType?: ReleaseType[];
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
  withWatchMonetizationTypes?: WatchMonetizationType[];
  withoutCompanies?: string;
}

export interface DiscoverTvFilters {
  page?: number;
  language?: string;
  sortBy?: TvSortBy;
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
  screened_theatrically?: boolean;
  withCompanies?: string;
  withKeywords?: string;
  withWatchProviders?: string;
  watchRegion?: string;
  withWatchMonetizationTypes?: WatchMonetizationType[];
  withStatus?: TvStatus[];
  withType?: TvType[];
  withoutCompanies?: string;
}

export enum SortBy {
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  RELEASE_DATE_ASC = 'release_date.asc',
  RELEASE_DATE_DESC = 'release_date.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC = 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC = 'primary_release_date.desc',
  ORIGINAL_TITLE_ASC = 'original_title.asc',
  ORIGINAL_TITLE_DESC = 'original_title.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}

export enum TvSortBy {
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  FIRST_AIR_DATE_DESC = 'first_air_date.desc',
  FIRST_AIR_DATE_ASC = 'first_air_date.asc',
  POPULARITY_DESC = 'popularity.desc',
  POPULARITY_ASC = 'popularity.asc',
}

export enum ReleaseType {
  PREMIERE = 1,
  THEATRICAL_LIMITED = 2,
  THEATRICAL = 3,
  DIGITAL = 4,
  PHYSICAL = 5,
  TV = 6,
}

export enum WatchMonetizationType {
  FLATRATE = 'flatrate',
  FREE = 'free',
  ADS = 'ads',
  RENT = 'rent',
  BUY = 'buy',
}

export enum TvStatus {
  RETURNING_SERIES = 0,
  PLANNED = 1,
  IN_PRODUCTION = 2,
  ENDED = 3,
  CANCELLED = 4,
  PILOT = 5,
}

export enum TvType {
  DOCUMENTARY = 0,
  NEWS = 1,
  MINISERIES = 2,
  REALITY = 3,
  SCRIPTED = 4,
  TALK_SHOW = 5,
  VIDEO = 6,
}

export enum TimeWindow {
  DAY = 'day',
  WEEK = 'week',
}

export enum MediaType {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person',
}
