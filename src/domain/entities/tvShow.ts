export class TvShow {
    protected constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly originalName: string,
        public readonly overview: string,
        public readonly firstAirDate: Date | null,
        public readonly posterPath: string | null,
        public readonly backdropPath: string | null,
        public readonly genreIds: number[],
        public readonly popularity: number,
        public readonly voteAverage: number,
        public readonly voteCount: number,
        public readonly adult: boolean,
        public readonly originalLanguage: string,
        public readonly originCountry: string[]
    ) {}

    public static create(data: any): TvShow {
        return new TvShow(
            data.id,
            data.name,
            data.original_name,
            data.overview,
            data.first_air_date ? new Date(data.first_air_date.replace(/-/g, '/')) : null,
            data.poster_path,
            data.backdrop_path,
            data.genre_ids,
            data.popularity,
            data.vote_average,
            data.vote_count,
            !!data.adult,
            data.original_language,
            data.origin_country || []
        );
    }

    public getPosterUrl(size: 'w500' | 'original' = 'w500'): string | null {
        if (!this.posterPath) {
            return null;
        }
        return `https://image.tmdb.org/t/p/${size}${this.posterPath}`;
    }

    public getBackdropUrl(size: 'w780' | 'original' = 'w780'): string | null {
        if (!this.backdropPath) {
            return null;
        }
        return `https://image.tmdb.org/t/p/${size}${this.backdropPath}`;
    }

    public getFirstAirYear(): string {
        return this.firstAirDate ? this.firstAirDate.getFullYear().toString() : 'N/A';
    }

    public getFormattedVoteAverage(): string {
        return this.voteAverage.toFixed(1);
    }
}

export class TvShowDetails extends TvShow {
    private constructor(
        id: number,
        name: string,
        originalName: string,
        overview: string,
        firstAirDate: Date | null,
        posterPath: string | null,
        backdropPath: string | null,
        genreIds: number[],
        popularity: number,
        voteAverage: number,
        voteCount: number,
        adult: boolean,
        originalLanguage: string,
        originCountry: string[],
        public readonly createdBy: { id: number; name: string; }[],
        public readonly episodeRunTime: number[],
        public readonly genres: { id: number; name: string; }[],
        public readonly homepage: string | null,
        public readonly inProduction: boolean,
        public readonly languages: string[],
        public readonly lastAirDate: Date | null,
        public readonly numberOfEpisodes: number,
        public readonly numberOfSeasons: number,
        public readonly networks: { id: number; name: string; }[],
        public readonly status: string,
        public readonly tagline: string | null,
        public readonly type: string
    ) {
        super(id, name, originalName, overview, firstAirDate, posterPath, backdropPath, genreIds, popularity, voteAverage, voteCount, adult, originalLanguage, originCountry);
    }

    public static createDetails(data: any): TvShowDetails {
        return new TvShowDetails(
            data.id,
            data.name,
            data.original_name,
            data.overview,
            data.first_air_date ? new Date(data.first_air_date.replace(/-/g, '/')) : null,
            data.poster_path,
            data.backdrop_path,
            data.genre_ids,
            data.popularity,
            data.vote_average,
            data.vote_count,
            !!data.adult,
            data.original_language,
            data.origin_country || [],
            data.created_by || [],
            data.episode_run_time || [],
            data.genres || [],
            data.homepage,
            data.in_production,
            data.languages || [],
            data.last_air_date ? new Date(data.last_air_date.replace(/-/g, '/')) : null,
            data.number_of_episodes,
            data.number_of_seasons,
            data.networks || [],
            data.status,
            data.tagline,
            data.type
        );
    }

    public getFormattedEpisodeRunTime(): string {
        if (!this.episodeRunTime || this.episodeRunTime.length === 0) {
            return 'N/A';
        }
        return `${this.episodeRunTime.join(', ')} minutes`;
    }

    public getGenreNames(): string {
        return this.genres.map(g => g.name).join(', ');
    }
}
