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
    console.log(chalk.green(`
📽️  Found ${results.totalResults} movies (Page ${results.page}/${results.totalPages})
`));

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
        movie.getReleaseYear(),
        `⭐ ${movie.getFormattedVoteAverage()}`,
        this.truncateText(movie.overview, 100),
      ]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayMovieDetails(movie: MovieDetails) {
    console.log(chalk.green(`
📽️  Movie Details
`));

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
      ['Release Date', movie.getReleaseYear()],
      ['Runtime', movie.getFormattedRuntime()],
      ['Rating', `⭐ ${movie.getFormattedVoteAverage()} (${movie.voteCount} votes)`],
      ['Genres', movie.getGenreNames()],
      ['Budget', movie.budget ? `${movie.budget.toLocaleString()}` : 'N/A'],
      ['Revenue', movie.revenue ? `${movie.revenue.toLocaleString()}` : 'N/A'],
      ['Overview', this.wrapText(movie.overview, 60)],
      ['Poster URL', movie.getPosterUrl()],
    );

    console.log(table.toString());
  }

  displayTvShowResults(results: SearchResult<TvShow>) {
    console.log(chalk.green(`
📺  Found ${results.totalResults} TV shows (Page ${results.page}/${results.totalPages})
`));

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
        show.getFirstAirYear(),
        `⭐ ${show.getFormattedVoteAverage()}`,
        this.truncateText(show.overview, 100),
      ]);
    });

    console.log(table.toString());
    this.displayPagination(results);
  }

  displayTvShowDetails(show: TvShowDetails) {
    console.log(chalk.green(`
📺  TV Show Details
`));

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
      ['First Air Date', show.getFirstAirYear()],
      ['Last Air Date', show.lastAirDate ? show.lastAirDate.getFullYear().toString() : 'N/A'],
      ['Status', show.status],
      ['Type', show.type],
      ['Rating', `⭐ ${show.getFormattedVoteAverage()} (${show.voteCount} votes)`],
      ['Genres', show.getGenreNames()],
      ['Networks', show.networks.map(n => n.name).join(', ')],
      ['Seasons', show.numberOfSeasons],
      ['Episodes', show.numberOfEpisodes],
      ['Episode Runtime', show.getFormattedEpisodeRunTime()],
      ['In Production', show.inProduction ? 'Yes' : 'No'],
      ['Tagline', show.tagline || 'N/A'],
      ['Overview', this.wrapText(show.overview, 60)],
      ['Homepage', show.homepage || 'N/A'],
      ['Poster URL', show.getPosterUrl()],
    );

    console.log(table.toString());
  }

  displayPersonResults(results: SearchResult<Person>) {
    console.log(chalk.green(`
👤  Found ${results.totalResults} people (Page ${results.page}/${results.totalPages})
`));

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
    console.log(chalk.green(`
👤  Person Details
`));

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
      ['Birthday', person.birthday ? person.birthday.toDateString() : 'N/A'],
      ['Deathday', person.deathday ? person.deathday.toDateString() : 'N/A'],
      ['Age', person.getAge()],
      ['Place of Birth', person.placeOfBirth || 'N/A'],
      ['Popularity', person.popularity.toFixed(1)],
      ['Gender', person.getGenderText()],
      ['Also Known As', person.alsoKnownAs.join(', ') || 'N/A'],
      ['Biography', this.wrapText(person.biography, 60)],
      ['Homepage', person.homepage || 'N/A'],
      ['IMDB ID', person.imdbId || 'N/A'],
      ['Profile URL', person.getProfileUrl()],
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
      const type = this.getMediaTypeIcon(result instanceof Movie ? 'movie' : result instanceof TvShow ? 'tv' : 'person');
      const title = (result instanceof Movie ? result.title : result instanceof TvShow ? result.name : result.name) || 'N/A';
      const date = (result instanceof Movie ? result.getReleaseYear() : result instanceof TvShow ? result.getFirstAirYear() : 'N/A');
      const rating = (result instanceof Movie || result instanceof TvShow) ? `⭐ ${result.getFormattedVoteAverage()}` : 'N/A';
      const overview = this.truncateText((result as Movie | TvShow).overview || '', 80);

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
      const type = this.getMediaTypeIcon(result instanceof Movie ? 'movie' : result instanceof TvShow ? 'tv' : 'person');
      const title = (result instanceof Movie ? result.title : result instanceof TvShow ? result.name : result.name) || 'N/A';
      const date = (result instanceof Movie ? result.getReleaseYear() : result instanceof TvShow ? result.getFirstAirYear() : 'N/A');
      const rating = (result instanceof Movie || result instanceof TvShow) ? `⭐ ${result.getFormattedVoteAverage()}` : 'N/A';
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
