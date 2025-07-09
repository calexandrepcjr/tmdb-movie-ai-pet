export interface TvShow {
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
}

export interface TvShowDetails extends TvShow {
  createdBy: Creator[];
  episodeRunTime: number[];
  genres: Genre[];
  homepage: string;
  inProduction: boolean;
  languages: string[];
  lastAirDate: string;
  lastEpisodeToAir: Episode | null;
  nextEpisodeToAir: Episode | null;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  seasons: Season[];
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
}

export interface Creator {
  id: number;
  creditId: string;
  name: string;
  gender: number;
  profilePath: string | null;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  airDate: string;
  episodeNumber: number;
  productionCode: string;
  runtime: number;
  seasonNumber: number;
  stillPath: string | null;
}

export interface Network {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  airDate: string;
  episodeCount: number;
  posterPath: string | null;
  seasonNumber: number;
  voteAverage: number;
}

// Reuse from Movie.ts
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
