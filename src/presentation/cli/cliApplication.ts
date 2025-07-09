import { Command } from 'commander';
import { SearchController } from '../controllers/searchController';
import { DIConfiguration } from '../../infrastructure/di/diConfiguration';
import { MovieRepository } from '../../domain/repositories/movieRepository';
import { TvShowRepository } from '../../domain/repositories/tvShowRepository';
import { PersonRepository } from '../../domain/repositories/personRepository';
import { SearchRepository } from '../../domain/repositories/searchRepository';
import { SearchService } from '../../domain/services/searchService';
import { MovieSearchUseCase } from '../../application/use-cases/movieSearchUseCase';
import { TvShowSearchUseCase } from '../../application/use-cases/tvShowSearchUseCase';
import { PersonSearchUseCase } from '../../application/use-cases/personSearchUseCase';
import { GeneralSearchUseCase } from '../../application/use-cases/generalSearchUseCase';
import { ConfigurationError } from '../../domain/value-objects/errors';
import chalk from 'chalk';

export class CliApplication {
  private program: Command;
  private searchController!: SearchController;

  constructor() {
    this.program = new Command();
    this.initializeDependencies();
    this.setupCommands();
  }

  private initializeDependencies() {
    try {
      // Get dependencies from DI container
      const container = DIConfiguration.getContainer();
      const movieRepository = container.resolve<MovieRepository>('MovieRepository');
      const tvShowRepository = container.resolve<TvShowRepository>('TvShowRepository');
      const personRepository = container.resolve<PersonRepository>('PersonRepository');
      const searchRepository = container.resolve<SearchRepository>('SearchRepository');

      // Domain
      const searchService = new SearchService(
        movieRepository,
        tvShowRepository,
        personRepository,
        searchRepository
      );

      // Application
      const movieSearchUseCase = new MovieSearchUseCase(searchService);
      const tvShowSearchUseCase = new TvShowSearchUseCase(searchService);
      const personSearchUseCase = new PersonSearchUseCase(searchService);
      const generalSearchUseCase = new GeneralSearchUseCase(searchService);

      // Presentation
      this.searchController = new SearchController(
        movieSearchUseCase,
        tvShowSearchUseCase,
        personSearchUseCase,
        generalSearchUseCase
      );
    } catch (error) {
      if (error instanceof ConfigurationError) {
        console.error(chalk.red('Configuration Error:'), error.message);
        console.log(chalk.yellow('Please make sure you have a .env file with TMDB_API_KEY set.'));
        console.log(chalk.yellow('You can get an API key from: https://www.themoviedb.org/settings/api'));
        process.exit(1);
      }
      throw error;
    }
  }

  private setupCommands() {
    this.program
      .name('tmdb-client')
      .description('A CLI client for The Movie Database (TMDB) API')
      .version('1.0.0');

    // Movie commands
    this.program
      .command('search-movies')
      .description('Search for movies')
      .argument('<query>', 'Search query')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-y, --year <number>', 'Release year')
      .option('-a, --adult', 'Include adult content')
      .option('-l, --language <string>', 'Language code')
      .option('-r, --region <string>', 'Region code')
      .action(async (query, options) => {
        await this.searchController.searchMovies(query, options);
      });

    this.program
      .command('discover-movies')
      .description('Discover movies with filters')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-y, --year <number>', 'Release year')
      .option('-g, --genres <string>', 'Genre IDs (comma-separated)')
      .option('-s, --sort <string>', 'Sort by (popularity.desc, release_date.desc, etc.)')
      .option('-v, --vote-average <number>', 'Minimum vote average')
      .option('-c, --vote-count <number>', 'Minimum vote count')
      .option('-a, --adult', 'Include adult content')
      .option('-l, --language <string>', 'Language code')
      .option('-r, --region <string>', 'Region code')
      .action(async (options) => {
        await this.searchController.discoverMovies(options);
      });

    this.program
      .command('movie-details')
      .description('Get detailed information about a movie')
      .argument('<id>', 'Movie ID')
      .action(async (id) => {
        await this.searchController.getMovieDetails(parseInt(id));
      });

    this.program
      .command('popular-movies')
      .description('Get popular movies')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getPopularMovies(options);
      });

    this.program
      .command('top-rated-movies')
      .description('Get top-rated movies')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getTopRatedMovies(options);
      });

    this.program
      .command('upcoming-movies')
      .description('Get upcoming movies')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getUpcomingMovies(options);
      });

    this.program
      .command('now-playing-movies')
      .description('Get now playing movies')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getNowPlayingMovies(options);
      });

    // TV Show commands
    this.program
      .command('search-tv')
      .description('Search for TV shows')
      .argument('<query>', 'Search query')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-y, --year <number>', 'First air date year')
      .option('-a, --adult', 'Include adult content')
      .option('-l, --language <string>', 'Language code')
      .action(async (query, options) => {
        await this.searchController.searchTvShows(query, options);
      });

    this.program
      .command('discover-tv')
      .description('Discover TV shows with filters')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-y, --year <number>', 'First air date year')
      .option('-g, --genres <string>', 'Genre IDs (comma-separated)')
      .option('-s, --sort <string>', 'Sort by (popularity.desc, first_air_date.desc, etc.)')
      .option('-v, --vote-average <number>', 'Minimum vote average')
      .option('-c, --vote-count <number>', 'Minimum vote count')
      .option('-l, --language <string>', 'Language code')
      .action(async (options) => {
        await this.searchController.discoverTvShows(options);
      });

    this.program
      .command('tv-details')
      .description('Get detailed information about a TV show')
      .argument('<id>', 'TV show ID')
      .action(async (id) => {
        await this.searchController.getTvShowDetails(parseInt(id));
      });

    this.program
      .command('popular-tv')
      .description('Get popular TV shows')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getPopularTvShows(options);
      });

    this.program
      .command('top-rated-tv')
      .description('Get top-rated TV shows')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getTopRatedTvShows(options);
      });

    this.program
      .command('airing-today-tv')
      .description('Get TV shows airing today')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getAiringTodayTvShows(options);
      });

    this.program
      .command('on-the-air-tv')
      .description('Get TV shows currently on the air')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getOnTheAirTvShows(options);
      });

    // Person commands
    this.program
      .command('search-people')
      .description('Search for people')
      .argument('<query>', 'Search query')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-a, --adult', 'Include adult content')
      .option('-l, --language <string>', 'Language code')
      .action(async (query, options) => {
        await this.searchController.searchPeople(query, options);
      });

    this.program
      .command('person-details')
      .description('Get detailed information about a person')
      .argument('<id>', 'Person ID')
      .action(async (id) => {
        await this.searchController.getPersonDetails(parseInt(id));
      });

    this.program
      .command('popular-people')
      .description('Get popular people')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (options) => {
        await this.searchController.getPopularPeople(options);
      });

    this.program
      .command('person-movies')
      .description('Get movie credits for a person')
      .argument('<id>', 'Person ID')
      .action(async (id) => {
        await this.searchController.getPersonMovieCredits(parseInt(id));
      });

    this.program
      .command('person-tv')
      .description('Get TV credits for a person')
      .argument('<id>', 'Person ID')
      .action(async (id) => {
        await this.searchController.getPersonTvCredits(parseInt(id));
      });

    // General search commands
    this.program
      .command('multi-search')
      .description('Search across movies, TV shows, and people')
      .argument('<query>', 'Search query')
      .option('-p, --page <number>', 'Page number', '1')
      .option('-a, --adult', 'Include adult content')
      .option('-l, --language <string>', 'Language code')
      .action(async (query, options) => {
        await this.searchController.multiSearch(query, options);
      });

    this.program
      .command('trending')
      .description('Get trending content')
      .argument('<media-type>', 'Media type (all, movie, tv, person)')
      .argument('<time-window>', 'Time window (day, week)')
      .option('-p, --page <number>', 'Page number', '1')
      .action(async (mediaType, timeWindow, options) => {
        await this.searchController.getTrending(mediaType, timeWindow, options);
      });

    // Interactive mode
    this.program
      .command('interactive')
      .alias('i')
      .description('Start interactive mode')
      .action(async () => {
        await this.searchController.startInteractiveMode();
      });
  }

  public run(args: string[]) {
    this.program.parse(args);
  }
}
