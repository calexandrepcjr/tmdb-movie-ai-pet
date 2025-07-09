export interface Person {
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
}

export interface PersonMovieCredits {
  cast: MovieCast[];
  crew: MovieCrew[];
}

export interface PersonTvCredits {
  cast: TvCast[];
  crew: TvCrew[];
}

export interface MovieCast {
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
  character: string;
  creditId: string;
  order: number;
}

export interface MovieCrew {
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
  creditId: string;
  department: string;
  job: string;
}

export interface TvCast {
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
  character: string;
  creditId: string;
  episodeCount: number;
}

export interface TvCrew {
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
  creditId: string;
  department: string;
  job: string;
  episodeCount: number;
}
