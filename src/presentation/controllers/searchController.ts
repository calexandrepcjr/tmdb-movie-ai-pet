import { MovieSearchUseCase } from '../../application/use-cases/movieSearchUseCase';
import { TvShowSearchUseCase } from '../../application/use-cases/tvShowSearchUseCase';
import { PersonSearchUseCase } from '../../application/use-cases/personSearchUseCase';
import { GeneralSearchUseCase } from '../../application/use-cases/generalSearchUseCase';
import { SortBy, TvSortBy, TimeWindow, MediaType } from '../../domain/value-objects/searchFilters';
import { ViewFormatter } from '../formatters/viewFormatter';
import { InteractiveMenu } from '../interactive/interactiveMenu';
import chalk from 'chalk';

export class SearchController {
  private viewFormatter: ViewFormatter;
  private interactiveMenu: InteractiveMenu;

  constructor(
    private movieSearchUseCase: MovieSearchUseCase,
    private tvShowSearchUseCase: TvShowSearchUseCase,
    private personSearchUseCase: PersonSearchUseCase,
    private generalSearchUseCase: GeneralSearchUseCase
  ) {
    this.viewFormatter = new ViewFormatter();
    this.interactiveMenu = new InteractiveMenu(this);
  }

  async searchMovies(query: string, options: any) {
    try {
      console.log(chalk.blue(`Searching for movies: "${query}"`));
      
      const result = await this.movieSearchUseCase.searchMovies(query, parseInt(options.page), {
        year: options.year ? parseInt(options.year) : undefined,
        includeAdult: options.adult || false,
        language: options.language,
        region: options.region,
      });

      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async discoverMovies(options: any) {
    try {
      console.log(chalk.blue('Discovering movies with filters...'));
      
      const result = await this.movieSearchUseCase.discoverMovies({
        page: parseInt(options.page),
        year: options.year ? parseInt(options.year) : undefined,
        withGenres: options.genres,
        sortBy: options.sort as SortBy,
        voteAverageGte: options.voteAverage ? parseFloat(options.voteAverage) : undefined,
        voteCountGte: options.voteCount ? parseInt(options.voteCount) : undefined,
        includeAdult: options.adult || false,
        language: options.language,
        region: options.region,
      });

      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMovieDetails(id: number) {
    try {
      console.log(chalk.blue(`Getting movie details for ID: ${id}`));
      
      const result = await this.movieSearchUseCase.getMovieDetails(id);
      this.viewFormatter.displayMovieDetails(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularMovies(options: any) {
    try {
      console.log(chalk.blue('Getting popular movies...'));
      
      const result = await this.movieSearchUseCase.getPopularMovies(parseInt(options.page));
      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopRatedMovies(options: any) {
    try {
      console.log(chalk.blue('Getting top-rated movies...'));
      
      const result = await this.movieSearchUseCase.getTopRatedMovies(parseInt(options.page));
      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUpcomingMovies(options: any) {
    try {
      console.log(chalk.blue('Getting upcoming movies...'));
      
      const result = await this.movieSearchUseCase.getUpcomingMovies(parseInt(options.page));
      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getNowPlayingMovies(options: any) {
    try {
      console.log(chalk.blue('Getting now playing movies...'));
      
      const result = await this.movieSearchUseCase.getNowPlayingMovies(parseInt(options.page));
      this.viewFormatter.displayMovieResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchTvShows(query: string, options: any) {
    try {
      console.log(chalk.blue(`Searching for TV shows: "${query}"`));
      
      const result = await this.tvShowSearchUseCase.searchTvShows(query, parseInt(options.page), {
        year: options.year ? parseInt(options.year) : undefined,
        includeAdult: options.adult || false,
        language: options.language,
      });

      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async discoverTvShows(options: any) {
    try {
      console.log(chalk.blue('Discovering TV shows with filters...'));
      
      const result = await this.tvShowSearchUseCase.discoverTvShows({
        page: parseInt(options.page),
        firstAirDateYear: options.year ? parseInt(options.year) : undefined,
        withGenres: options.genres,
        sortBy: options.sort as TvSortBy,
        voteAverageGte: options.voteAverage ? parseFloat(options.voteAverage) : undefined,
        voteCountGte: options.voteCount ? parseInt(options.voteCount) : undefined,
        language: options.language,
      });

      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTvShowDetails(id: number) {
    try {
      console.log(chalk.blue(`Getting TV show details for ID: ${id}`));
      
      const result = await this.tvShowSearchUseCase.getTvShowDetails(id);
      this.viewFormatter.displayTvShowDetails(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularTvShows(options: any) {
    try {
      console.log(chalk.blue('Getting popular TV shows...'));
      
      const result = await this.tvShowSearchUseCase.getPopularTvShows(parseInt(options.page));
      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTopRatedTvShows(options: any) {
    try {
      console.log(chalk.blue('Getting top-rated TV shows...'));
      
      const result = await this.tvShowSearchUseCase.getTopRatedTvShows(parseInt(options.page));
      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAiringTodayTvShows(options: any) {
    try {
      console.log(chalk.blue('Getting TV shows airing today...'));
      
      const result = await this.tvShowSearchUseCase.getAiringTodayTvShows(parseInt(options.page));
      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOnTheAirTvShows(options: any) {
    try {
      console.log(chalk.blue('Getting TV shows on the air...'));
      
      const result = await this.tvShowSearchUseCase.getOnTheAirTvShows(parseInt(options.page));
      this.viewFormatter.displayTvShowResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchPeople(query: string, options: any) {
    try {
      console.log(chalk.blue(`Searching for people: "${query}"`));
      
      const result = await this.personSearchUseCase.searchPeople(query, parseInt(options.page), {
        includeAdult: options.adult || false,
        language: options.language,
      });

      this.viewFormatter.displayPersonResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonDetails(id: number) {
    try {
      console.log(chalk.blue(`Getting person details for ID: ${id}`));
      
      const result = await this.personSearchUseCase.getPersonDetails(id);
      this.viewFormatter.displayPersonDetails(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPopularPeople(options: any) {
    try {
      console.log(chalk.blue('Getting popular people...'));
      
      const result = await this.personSearchUseCase.getPopularPeople(parseInt(options.page));
      this.viewFormatter.displayPersonResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonMovieCredits(id: number) {
    try {
      console.log(chalk.blue(`Getting movie credits for person ID: ${id}`));
      
      const result = await this.personSearchUseCase.getPersonMovieCredits(id);
      this.viewFormatter.displayPersonMovieCredits(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPersonTvCredits(id: number) {
    try {
      console.log(chalk.blue(`Getting TV credits for person ID: ${id}`));
      
      const result = await this.personSearchUseCase.getPersonTvCredits(id);
      this.viewFormatter.displayPersonTvCredits(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async multiSearch(query: string, options: any) {
    try {
      console.log(chalk.blue(`Multi-searching for: "${query}"`));
      
      const result = await this.generalSearchUseCase.multiSearch(query, parseInt(options.page), {
        includeAdult: options.adult || false,
        language: options.language,
      });

      this.viewFormatter.displayMultiSearchResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTrending(mediaType: string, timeWindow: string, options: any) {
    try {
      console.log(chalk.blue(`Getting trending ${mediaType} for ${timeWindow}...`));
      
      const result = await this.generalSearchUseCase.getTrending(
        mediaType as MediaType,
        timeWindow as TimeWindow,
        parseInt(options.page)
      );

      this.viewFormatter.displayTrendingResults(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async startInteractiveMode() {
    try {
      await this.interactiveMenu.start();
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.error(chalk.red('Error:'), error.message);
    if (error.statusCode) {
      console.error(chalk.red('Status Code:'), error.statusCode);
    }
    if (error.stack && process.env.NODE_ENV === 'development') {
      console.error(chalk.red('Stack:'), error.stack);
    }
  }
}
