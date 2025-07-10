export class Movie {
    protected constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly overview: string,
        public readonly releaseDate: Date | null,
        public readonly posterPath: string | null,
        public readonly backdropPath: string | null,
        public readonly voteAverage: number,
        public readonly voteCount: number,
        public readonly popularity: number,
        public readonly adult: boolean,
        public readonly originalLanguage: string,
        public readonly originalTitle: string,
        public readonly genreIds: number[]
    ) {}

    public static create(data: any): Movie {
        const releaseDate = data.release_date ? new Date(data.release_date.replace(/-/g, '/')) : null;
        return new Movie(
            data.id,
            data.title,
            data.overview,
            releaseDate,
            data.poster_path,
            data.backdrop_path,
            data.vote_average,
            data.vote_count,
            data.popularity,
            data.adult || false,
            data.original_language,
            data.original_title,
            data.genre_ids || []
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

    public getReleaseYear(): string {
        return this.releaseDate ? this.releaseDate.getFullYear().toString() : 'N/A';
    }

    public getFormattedVoteAverage(): string {
        return this.voteAverage.toFixed(1);
    }
}

export class MovieDetails extends Movie {
    private constructor(
        id: number,
        title: string,
        overview: string,
        releaseDate: Date | null,
        posterPath: string | null,
        backdropPath: string | null,
        voteAverage: number,
        voteCount: number,
        public readonly runtime: number | null,
        public readonly genres: { id: number; name: string }[],
        public readonly budget: number,
        public readonly revenue: number,
        popularity: number,
        adult: boolean,
        originalLanguage: string,
        originalTitle: string,
        genreIds: number[]
    ) {
        super(id, title, overview, releaseDate, posterPath, backdropPath, voteAverage, voteCount, popularity, adult, originalLanguage, originalTitle, genreIds);
    }

    public static createDetails(data: any): MovieDetails {
        const releaseDate = data.release_date ? new Date(data.release_date.replace(/-/g, '/')) : null;
        return new MovieDetails(
            data.id,
            data.title,
            data.overview,
            releaseDate,
            data.poster_path,
            data.backdrop_path,
            data.vote_average,
            data.vote_count,
            data.runtime,
            data.genres,
            data.budget,
            data.revenue,
            data.popularity,
            data.adult || false,
            data.original_language,
            data.original_title,
            data.genre_ids || []
        );
    }

    public getFormattedRuntime(): string {
        if (this.runtime === null) {
            return 'N/A';
        }
        const hours = Math.floor(this.runtime / 60);
        const minutes = this.runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    public getGenreNames(): string {
        return this.genres.map(g => g.name).join(', ');
    }
}