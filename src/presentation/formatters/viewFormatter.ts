import { Movie, MovieDetails } from '../../domain/entities/movie';
import { TvShow, TvShowDetails } from '../../domain/entities/tvShow';
import { Person, PersonMovieCredits, PersonTvCredits } from '../../domain/entities/person';
import { SearchResult, MultiSearchResult, TrendingResult } from '../../domain/entities/searchResult';
import { ConfigService } from '../../infrastructure/config/configService';
import Table from 'cli-table3';
import chalk from 'chalk';

export class ViewFormatter {
  private configService: ConfigService;

  constructor() {
    this.configService = ConfigService.getInstance();
  }

  displayMovieResults(results: SearchResult<Movie>) {
    console.log(chalk.green(`\n📽️  Found ${results.totalResults} movies (Page ${results.page}/${results.totalPages})\n`));

    if (results.results.length === 0) {
      console.log(chalk.yellow('No movies found.'));
      return;
    }

    const table = new Table({
      head: ['ID', 'Title', 'Release Date', 'Rating', 'Overview'],
      colWidths: [8, 30, 15, 10, 50],
      wordWrap: true,
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    results.results.forEach((movie) => {
      table.push([
        movie.id,
        movie.title,
        movie.releaseDate || 'N/A',
        `⭐ ${movie.voteAverage.toFixed(1)}`,
        this.truncateText(movie.overview, 100),
      ]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayMovieDetails(movie: MovieDetails) {
    console.log(chalk.green(`\n📽️  Movie Details\n`));

    const table = new Table({
      chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│',
      },
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    table.push(
      ['ID', movie.id],
      ['Title', movie.title],
      ['Original Title', movie.originalTitle],
      ['Release Date', movie.releaseDate || 'N/A'],
      ['Runtime', movie.runtime ? `${movie.runtime} minutes` : 'N/A'],
      ['Rating', `⭐ ${movie.voteAverage.toFixed(1)} (${movie.voteCount} votes)`],
      ['Genres', movie.genres.map(g => g.name).join(', ')],
      ['Status', movie.status],
      ['Budget', movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'],
      ['Revenue', movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'],
      ['Tagline', movie.tagline || 'N/A'],
      ['Overview', this.wrapText(movie.overview, 60)],
      ['Homepage', movie.homepage || 'N/A'],
      ['IMDB ID', movie.imdbId || 'N/A'],
      ['Poster URL', movie.posterPath ? this.configService.getFullImageUrl(movie.posterPath) : 'N/A'],
    );

    console.log(table.toString());
  }

  displayTvShowResults(results: SearchResult<TvShow>) {
    console.log(chalk.green(`\n📺  Found ${results.totalResults} TV shows (Page ${results.page}/${results.totalPages})\n`));

    if (results.results.length === 0) {
      console.log(chalk.yellow('No TV shows found.'));
      return;
    }

    const table = new Table({
      head: ['ID', 'Name', 'First Air Date', 'Rating', 'Overview'],
      colWidths: [8, 30, 15, 10, 50],
      wordWrap: true,
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    results.results.forEach((show) => {
      table.push([
        show.id,
        show.name,
        show.firstAirDate || 'N/A',
        `⭐ ${show.voteAverage.toFixed(1)}`,
        this.truncateText(show.overview, 100),
      ]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayTvShowDetails(show: TvShowDetails) {
    console.log(chalk.green(`\n📺  TV Show Details\n`));

    const table = new Table({
      chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│',
      },
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    table.push(
      ['ID', show.id],
      ['Name', show.name],
      ['Original Name', show.originalName],
      ['First Air Date', show.firstAirDate || 'N/A'],
      ['Last Air Date', show.lastAirDate || 'N/A'],
      ['Status', show.status],
      ['Type', show.type],
      ['Rating', `⭐ ${show.voteAverage.toFixed(1)} (${show.voteCount} votes)`],
      ['Genres', show.genres.map(g => g.name).join(', ')],
      ['Networks', show.networks.map(n => n.name).join(', ')],
      ['Seasons', show.numberOfSeasons],
      ['Episodes', show.numberOfEpisodes],
      ['Episode Runtime', show.episodeRunTime.join(', ') + ' minutes'],
      ['In Production', show.inProduction ? 'Yes' : 'No'],
      ['Tagline', show.tagline || 'N/A'],
      ['Overview', this.wrapText(show.overview, 60)],
      ['Homepage', show.homepage || 'N/A'],
      ['Poster URL', show.posterPath ? this.configService.getFullImageUrl(show.posterPath) : 'N/A'],
    );

    console.log(table.toString());
  }

  displayPersonResults(results: SearchResult<Person>) {
    console.log(chalk.green(`\n👤  Found ${results.totalResults} people (Page ${results.page}/${results.totalPages})\n`));

    if (results.results.length === 0) {
      console.log(chalk.yellow('No people found.'));
      return;
    }

    const table = new Table({
      head: ['ID', 'Name', 'Known For', 'Popularity', 'Place of Birth'],
      colWidths: [8, 25, 20, 12, 30],
      wordWrap: true,
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    results.results.forEach((person) => {
      table.push([
        person.id,
        person.name,
        person.knownForDepartment,
        person.popularity.toFixed(1),
        person.placeOfBirth || 'N/A',
      ]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayPersonDetails(person: Person) {
    console.log(chalk.green(`\n👤  Person Details\n`));

    const table = new Table({
      chars: {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│',
      },
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    table.push(
      ['ID', person.id],
      ['Name', person.name],
      ['Known For', person.knownForDepartment],
      ['Birthday', person.birthday || 'N/A'],
      ['Deathday', person.deathday || 'N/A'],
      ['Place of Birth', person.placeOfBirth || 'N/A'],
      ['Popularity', person.popularity.toFixed(1)],
      ['Gender', this.getGenderText(person.gender)],
      ['Also Known As', person.alsoKnownAs.join(', ') || 'N/A'],
      ['Biography', this.wrapText(person.biography, 60)],
      ['Homepage', person.homepage || 'N/A'],
      ['IMDB ID', person.imdbId || 'N/A'],
      ['Profile URL', person.profilePath ? this.configService.getFullImageUrl(person.profilePath) : 'N/A'],
    );

    console.log(table.toString());
  }

  displayPersonMovieCredits(credits: PersonMovieCredits) {
    console.log(chalk.green(`\n🎬  Movie Credits\n`));

    if (credits.cast.length > 0) {
      console.log(chalk.yellow('As Cast:'));
      const castTable = new Table({
        head: ['Title', 'Character', 'Release Date', 'Rating'],
        colWidths: [30, 25, 15, 10],
        wordWrap: true,
        style: {
          head: ['cyan'],
          border: ['grey'],
        },
      });

      credits.cast.forEach((movie) => {
        castTable.push([
          movie.title,
          movie.character,
          movie.releaseDate || 'N/A',
          `⭐ ${movie.voteAverage.toFixed(1)}`,
        ]);
      });

      console.log(castTable.toString());
    }

    if (credits.crew.length > 0) {
      console.log(chalk.yellow('\nAs Crew:'));
      const crewTable = new Table({
        head: ['Title', 'Job', 'Department', 'Release Date'],
        colWidths: [30, 20, 15, 15],
        wordWrap: true,
        style: {
          head: ['cyan'],
          border: ['grey'],
        },
      });

      credits.crew.forEach((movie) => {
        crewTable.push([
          movie.title,
          movie.job,
          movie.department,
          movie.releaseDate || 'N/A',
        ]);
      });

      console.log(crewTable.toString());
    }
  }

  displayPersonTvCredits(credits: PersonTvCredits) {
    console.log(chalk.green(`\n📺  TV Credits\n`));

    if (credits.cast.length > 0) {
      console.log(chalk.yellow('As Cast:'));
      const castTable = new Table({
        head: ['Name', 'Character', 'Episodes', 'First Air Date'],
        colWidths: [30, 25, 10, 15],
        wordWrap: true,
        style: {
          head: ['cyan'],
          border: ['grey'],
        },
      });

      credits.cast.forEach((show) => {
        castTable.push([
          show.name,
          show.character,
          show.episodeCount,
          show.firstAirDate || 'N/A',
        ]);
      });

      console.log(castTable.toString());
    }

    if (credits.crew.length > 0) {
      console.log(chalk.yellow('\nAs Crew:'));
      const crewTable = new Table({
        head: ['Name', 'Job', 'Department', 'Episodes'],
        colWidths: [30, 20, 15, 10],
        wordWrap: true,
        style: {
          head: ['cyan'],
          border: ['grey'],
        },
      });

      credits.crew.forEach((show) => {
        crewTable.push([
          show.name,
          show.job,
          show.department,
          show.episodeCount,
        ]);
      });

      console.log(crewTable.toString());
    }
  }

  displayMultiSearchResults(results: SearchResult<MultiSearchResult>) {
    console.log(chalk.green(`\n🔍  Found ${results.totalResults} results (Page ${results.page}/${results.totalPages})\n`));

    if (results.results.length === 0) {
      console.log(chalk.yellow('No results found.'));
      return;
    }

    const table = new Table({
      head: ['Type', 'ID', 'Title/Name', 'Date', 'Rating', 'Overview'],
      colWidths: [8, 8, 30, 12, 10, 40],
      wordWrap: true,
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    results.results.forEach((result) => {
      const type = this.getMediaTypeIcon(result.mediaType);
      const title = result.title || result.name || 'N/A';
      const date = result.releaseDate || result.firstAirDate || 'N/A';
      const rating = result.voteAverage ? `⭐ ${result.voteAverage.toFixed(1)}` : 'N/A';
      const overview = this.truncateText(result.overview || '', 80);

      table.push([type, result.id, title, date, rating, overview]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayTrendingResults(results: SearchResult<TrendingResult>) {
    console.log(chalk.green(`\n🔥  Trending Results (Page ${results.page}/${results.totalPages})\n`));

    if (results.results.length === 0) {
      console.log(chalk.yellow('No trending results found.'));
      return;
    }

    const table = new Table({
      head: ['Type', 'ID', 'Title/Name', 'Date', 'Rating', 'Popularity'],
      colWidths: [8, 8, 30, 12, 10, 12],
      wordWrap: true,
      style: {
        head: ['cyan'],
        border: ['grey'],
      },
    });

    results.results.forEach((result) => {
      const type = this.getMediaTypeIcon(result.mediaType);
      const title = result.title || result.name || 'N/A';
      const date = result.releaseDate || result.firstAirDate || 'N/A';
      const rating = result.voteAverage ? `⭐ ${result.voteAverage.toFixed(1)}` : 'N/A';
      const popularity = result.popularity.toFixed(1);

      table.push([type, result.id, title, date, rating, popularity]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  private displayPagination(results: SearchResult<any>) {
    console.log(chalk.grey(`\nPage ${results.page} of ${results.totalPages} (${results.totalResults} total results)`));
  }

  private getMediaTypeIcon(mediaType: string): string {
    switch (mediaType) {
      case 'movie':
        return '🎬';
      case 'tv':
        return '📺';
      case 'person':
        return '👤';
      default:
        return '❓';
    }
  }

  private getGenderText(gender: number): string {
    switch (gender) {
      case 1:
        return 'Female';
      case 2:
        return 'Male';
      case 3:
        return 'Non-binary';
      default:
        return 'Not specified';
    }
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + '...';
  }

  private wrapText(text: string, maxWidth: number): string {
    if (!text) return '';
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length > maxWidth) {
        if (currentLine) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          lines.push(word);
        }
      } else {
        currentLine += word + ' ';
      }
    }

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines.join('\n');
  }
}
