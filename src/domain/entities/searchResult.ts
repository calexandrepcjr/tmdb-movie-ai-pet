import { Movie } from './movie';
import { TvShow } from './tvShow';
import { Person } from './person';

export interface SearchResult<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export type MultiSearchResult = Movie | TvShow | Person;

export type TrendingResult = Movie | TvShow | Person;

export class MultiResultFactory {
  public static create(data: any): MultiSearchResult {
    switch (data.media_type) {
      case 'movie':
        return Movie.create(data);
      case 'tv':
        return TvShow.create(data);
      case 'person':
        return Person.create(data);
      default:
        throw new Error(`Unknown media type: ${data.media_type}`);
    }
  }
}

export class TrendingResultFactory {
  public static create(data: any): TrendingResult {
    switch (data.media_type) {
      case 'movie':
        return Movie.create(data);
      case 'tv':
        return TvShow.create(data);
      case 'person':
        return Person.create(data);
      default:
        throw new Error(`Unknown media type: ${data.media_type}`);
    }
  }
}