export interface Movie {
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
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: Genre[];
  homepage: string;
  imdbId: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  belongsToCollection: Collection | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface ProductionCountry {
  iso31661: string;
  name: string;
}

export interface SpokenLanguage {
  englishName: string;
  iso6391: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  posterPath: string | null;
  backdropPath: string | null;
}
