export class Person {
    private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly biography: string,
        public readonly birthday: Date | null,
        public readonly deathday: Date | null,
        public readonly gender: number,
        public readonly profilePath: string | null,
        public readonly knownForDepartment: string,
        public readonly placeOfBirth: string | null,
        public readonly popularity: number,
        public readonly adult: boolean,
        public readonly alsoKnownAs: string[],
        public readonly homepage: string | null,
        public readonly imdbId: string | null
    ) {}

    public static create(data: any): Person {
        return new Person(
            data.id,
            data.name,
            data.biography,
            data.birthday ? new Date(data.birthday.replace(/-/g, '/')) : null,
            data.deathday ? new Date(data.deathday.replace(/-/g, '/')) : null,
            data.gender,
            data.profile_path,
            data.known_for_department,
            data.place_of_birth,
            data.popularity,
            !!data.adult,
            data.also_known_as,
            data.homepage,
            data.imdb_id
        );
    }

    public getProfileUrl(size: 'w500' | 'original' = 'w500'): string | null {
        if (!this.profilePath) {
            return null;
        }
        return `https://image.tmdb.org/t/p/${size}${this.profilePath}`;
    }

    public getGenderText(): string {
        switch (this.gender) {
            case 1:
                return 'Female';
            case 2:
                return 'Male';
            default:
                return 'Not specified';
        }
    }

    public getAge(): number | null {
        if (!this.birthday) {
            return null;
        }
        const today = this.deathday || new Date();
        const birthDate = this.birthday;
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}

export interface PersonMovieCredits {
  cast: any[];//MovieCast[];
  crew: any[];//MovieCrew[];
}

export interface PersonTvCredits {
  cast: any[];//TvCast[];
  crew: any[];//TvCrew[];
}
