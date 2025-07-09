import inquirer from 'inquirer';
import { SearchController } from '../controllers/searchController';
import { SortBy, TvSortBy, TimeWindow, MediaType } from '../../domain/value-objects/searchFilters';
import chalk from 'chalk';

export class InteractiveMenu {
  constructor(private searchController: SearchController) {}

  async start() {
    console.log(chalk.blue('\n🎬 Welcome to TMDB Movie Client Interactive Mode!\n'));

    while (true) {
      try {
        const { mainAction } = await inquirer.prompt([
          {
            type: 'list',
            name: 'mainAction',
            message: 'What would you like to do?',
            choices: [
              { name: '🎬 Search Movies', value: 'search_movies' },
              { name: '📺 Search TV Shows', value: 'search_tv' },
              { name: '👤 Search People', value: 'search_people' },
              { name: '🔍 Multi Search', value: 'multi_search' },
              { name: '🔥 Trending Content', value: 'trending' },
              { name: '📋 Browse Lists', value: 'browse_lists' },
              { name: '⚙️ Advanced Search', value: 'advanced_search' },
              { name: '❌ Exit', value: 'exit' },
            ],
          },
        ]);

        if (mainAction === 'exit') {
          console.log(chalk.green('\nGoodbye! 👋'));
          break;
        }

        await this.handleMainAction(mainAction);
      } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
      }
    }
  }

  private async handleMainAction(action: string) {
    switch (action) {
      case 'search_movies':
        await this.handleMovieSearch();
        break;
      case 'search_tv':
        await this.handleTvSearch();
        break;
      case 'search_people':
        await this.handlePersonSearch();
        break;
      case 'multi_search':
        await this.handleMultiSearch();
        break;
      case 'trending':
        await this.handleTrending();
        break;
      case 'browse_lists':
        await this.handleBrowseLists();
        break;
      case 'advanced_search':
        await this.handleAdvancedSearch();
        break;
    }
  }

  private async handleMovieSearch() {
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'How would you like to search for movies?',
        choices: [
          { name: '🔍 Search by Title', value: 'search' },
          { name: '🎯 Discover with Filters', value: 'discover' },
          { name: '🔢 Get Details by ID', value: 'details' },
          { name: '🌟 Popular Movies', value: 'popular' },
          { name: '⭐ Top Rated Movies', value: 'top_rated' },
          { name: '🆕 Upcoming Movies', value: 'upcoming' },
          { name: '🎭 Now Playing Movies', value: 'now_playing' },
          { name: '🔙 Back to Main Menu', value: 'back' },
        ],
      },
    ]);

    if (searchType === 'back') return;

    switch (searchType) {
      case 'search':
        await this.movieTextSearch();
        break;
      case 'discover':
        await this.movieDiscoverSearch();
        break;
      case 'details':
        await this.movieDetailsSearch();
        break;
      case 'popular':
        await this.searchController.getPopularMovies({ page: '1' });
        break;
      case 'top_rated':
        await this.searchController.getTopRatedMovies({ page: '1' });
        break;
      case 'upcoming':
        await this.searchController.getUpcomingMovies({ page: '1' });
        break;
      case 'now_playing':
        await this.searchController.getNowPlayingMovies({ page: '1' });
        break;
    }
  }

  private async movieTextSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Enter movie title to search for:',
        validate: (input) => input.trim() !== '' || 'Please enter a search query',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Release year (optional):',
        validate: (input) => !input || /^\d{4}$/.test(input) || 'Please enter a valid year',
      },
      {
        type: 'confirm',
        name: 'includeAdult',
        message: 'Include adult content?',
        default: false,
      },
    ]);

    await this.searchController.searchMovies(answers.query, {
      page: '1',
      year: answers.year,
      adult: answers.includeAdult,
    });
  }

  private async movieDiscoverSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'year',
        message: 'Release year (optional):',
        validate: (input) => !input || /^\d{4}$/.test(input) || 'Please enter a valid year',
      },
      {
        type: 'input',
        name: 'genres',
        message: 'Genre IDs (comma-separated, optional):',
      },
      {
        type: 'list',
        name: 'sort',
        message: 'Sort by:',
        choices: [
          { name: 'Popularity (Descending)', value: SortBy.POPULARITY_DESC },
          { name: 'Popularity (Ascending)', value: SortBy.POPULARITY_ASC },
          { name: 'Release Date (Descending)', value: SortBy.RELEASE_DATE_DESC },
          { name: 'Release Date (Ascending)', value: SortBy.RELEASE_DATE_ASC },
          { name: 'Rating (Descending)', value: SortBy.VOTE_AVERAGE_DESC },
          { name: 'Rating (Ascending)', value: SortBy.VOTE_AVERAGE_ASC },
        ],
      },
      {
        type: 'input',
        name: 'voteAverage',
        message: 'Minimum vote average (optional):',
        validate: (input) => !input || /^\d+(\.\d+)?$/.test(input) || 'Please enter a valid number',
      },
      {
        type: 'input',
        name: 'voteCount',
        message: 'Minimum vote count (optional):',
        validate: (input) => !input || /^\d+$/.test(input) || 'Please enter a valid number',
      },
    ]);

    await this.searchController.discoverMovies({
      page: '1',
      ...answers,
    });
  }

  private async movieDetailsSearch() {
    const { movieId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'movieId',
        message: 'Enter movie ID:',
        validate: (input) => /^\d+$/.test(input) || 'Please enter a valid movie ID',
      },
    ]);

    await this.searchController.getMovieDetails(parseInt(movieId));
  }

  private async handleTvSearch() {
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'How would you like to search for TV shows?',
        choices: [
          { name: '🔍 Search by Title', value: 'search' },
          { name: '🎯 Discover with Filters', value: 'discover' },
          { name: '🔢 Get Details by ID', value: 'details' },
          { name: '🌟 Popular TV Shows', value: 'popular' },
          { name: '⭐ Top Rated TV Shows', value: 'top_rated' },
          { name: '📺 Airing Today', value: 'airing_today' },
          { name: '🔴 On The Air', value: 'on_the_air' },
          { name: '🔙 Back to Main Menu', value: 'back' },
        ],
      },
    ]);

    if (searchType === 'back') return;

    switch (searchType) {
      case 'search':
        await this.tvTextSearch();
        break;
      case 'discover':
        await this.tvDiscoverSearch();
        break;
      case 'details':
        await this.tvDetailsSearch();
        break;
      case 'popular':
        await this.searchController.getPopularTvShows({ page: '1' });
        break;
      case 'top_rated':
        await this.searchController.getTopRatedTvShows({ page: '1' });
        break;
      case 'airing_today':
        await this.searchController.getAiringTodayTvShows({ page: '1' });
        break;
      case 'on_the_air':
        await this.searchController.getOnTheAirTvShows({ page: '1' });
        break;
    }
  }

  private async tvTextSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Enter TV show title to search for:',
        validate: (input) => input.trim() !== '' || 'Please enter a search query',
      },
      {
        type: 'input',
        name: 'year',
        message: 'First air date year (optional):',
        validate: (input) => !input || /^\d{4}$/.test(input) || 'Please enter a valid year',
      },
      {
        type: 'confirm',
        name: 'includeAdult',
        message: 'Include adult content?',
        default: false,
      },
    ]);

    await this.searchController.searchTvShows(answers.query, {
      page: '1',
      year: answers.year,
      adult: answers.includeAdult,
    });
  }

  private async tvDiscoverSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'year',
        message: 'First air date year (optional):',
        validate: (input) => !input || /^\d{4}$/.test(input) || 'Please enter a valid year',
      },
      {
        type: 'input',
        name: 'genres',
        message: 'Genre IDs (comma-separated, optional):',
      },
      {
        type: 'list',
        name: 'sort',
        message: 'Sort by:',
        choices: [
          { name: 'Popularity (Descending)', value: TvSortBy.POPULARITY_DESC },
          { name: 'Popularity (Ascending)', value: TvSortBy.POPULARITY_ASC },
          { name: 'First Air Date (Descending)', value: TvSortBy.FIRST_AIR_DATE_DESC },
          { name: 'First Air Date (Ascending)', value: TvSortBy.FIRST_AIR_DATE_ASC },
          { name: 'Rating (Descending)', value: TvSortBy.VOTE_AVERAGE_DESC },
          { name: 'Rating (Ascending)', value: TvSortBy.VOTE_AVERAGE_ASC },
        ],
      },
      {
        type: 'input',
        name: 'voteAverage',
        message: 'Minimum vote average (optional):',
        validate: (input) => !input || /^\d+(\.\d+)?$/.test(input) || 'Please enter a valid number',
      },
      {
        type: 'input',
        name: 'voteCount',
        message: 'Minimum vote count (optional):',
        validate: (input) => !input || /^\d+$/.test(input) || 'Please enter a valid number',
      },
    ]);

    await this.searchController.discoverTvShows({
      page: '1',
      ...answers,
    });
  }

  private async tvDetailsSearch() {
    const { tvId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'tvId',
        message: 'Enter TV show ID:',
        validate: (input) => /^\d+$/.test(input) || 'Please enter a valid TV show ID',
      },
    ]);

    await this.searchController.getTvShowDetails(parseInt(tvId));
  }

  private async handlePersonSearch() {
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'How would you like to search for people?',
        choices: [
          { name: '🔍 Search by Name', value: 'search' },
          { name: '🔢 Get Details by ID', value: 'details' },
          { name: '🌟 Popular People', value: 'popular' },
          { name: '🎬 Person\'s Movie Credits', value: 'movie_credits' },
          { name: '📺 Person\'s TV Credits', value: 'tv_credits' },
          { name: '🔙 Back to Main Menu', value: 'back' },
        ],
      },
    ]);

    if (searchType === 'back') return;

    switch (searchType) {
      case 'search':
        await this.personTextSearch();
        break;
      case 'details':
        await this.personDetailsSearch();
        break;
      case 'popular':
        await this.searchController.getPopularPeople({ page: '1' });
        break;
      case 'movie_credits':
        await this.personMovieCreditsSearch();
        break;
      case 'tv_credits':
        await this.personTvCreditsSearch();
        break;
    }
  }

  private async personTextSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Enter person name to search for:',
        validate: (input) => input.trim() !== '' || 'Please enter a search query',
      },
      {
        type: 'confirm',
        name: 'includeAdult',
        message: 'Include adult content?',
        default: false,
      },
    ]);

    await this.searchController.searchPeople(answers.query, {
      page: '1',
      adult: answers.includeAdult,
    });
  }

  private async personDetailsSearch() {
    const { personId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'personId',
        message: 'Enter person ID:',
        validate: (input) => /^\d+$/.test(input) || 'Please enter a valid person ID',
      },
    ]);

    await this.searchController.getPersonDetails(parseInt(personId));
  }

  private async personMovieCreditsSearch() {
    const { personId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'personId',
        message: 'Enter person ID:',
        validate: (input) => /^\d+$/.test(input) || 'Please enter a valid person ID',
      },
    ]);

    await this.searchController.getPersonMovieCredits(parseInt(personId));
  }

  private async personTvCreditsSearch() {
    const { personId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'personId',
        message: 'Enter person ID:',
        validate: (input) => /^\d+$/.test(input) || 'Please enter a valid person ID',
      },
    ]);

    await this.searchController.getPersonTvCredits(parseInt(personId));
  }

  private async handleMultiSearch() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'query',
        message: 'Enter search query (searches movies, TV shows, and people):',
        validate: (input) => input.trim() !== '' || 'Please enter a search query',
      },
      {
        type: 'confirm',
        name: 'includeAdult',
        message: 'Include adult content?',
        default: false,
      },
    ]);

    await this.searchController.multiSearch(answers.query, {
      page: '1',
      adult: answers.includeAdult,
    });
  }

  private async handleTrending() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'mediaType',
        message: 'What type of content do you want to see trending?',
        choices: [
          { name: '🎬 Movies', value: MediaType.MOVIE },
          { name: '📺 TV Shows', value: MediaType.TV },
          { name: '👤 People', value: MediaType.PERSON },
          { name: '🌟 All Content', value: MediaType.ALL },
        ],
      },
      {
        type: 'list',
        name: 'timeWindow',
        message: 'Time window:',
        choices: [
          { name: '📅 Today', value: TimeWindow.DAY },
          { name: '📆 This Week', value: TimeWindow.WEEK },
        ],
      },
    ]);

    await this.searchController.getTrending(answers.mediaType, answers.timeWindow, { page: '1' });
  }

  private async handleBrowseLists() {
    const { listType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'listType',
        message: 'Which list would you like to browse?',
        choices: [
          { name: '🎬 Movie Lists', value: 'movie_lists' },
          { name: '📺 TV Show Lists', value: 'tv_lists' },
          { name: '👤 People Lists', value: 'people_lists' },
          { name: '🔙 Back to Main Menu', value: 'back' },
        ],
      },
    ]);

    if (listType === 'back') return;

    switch (listType) {
      case 'movie_lists':
        await this.handleMovieListsBrowse();
        break;
      case 'tv_lists':
        await this.handleTvListsBrowse();
        break;
      case 'people_lists':
        await this.handlePeopleListsBrowse();
        break;
    }
  }

  private async handleMovieListsBrowse() {
    const { movieList } = await inquirer.prompt([
      {
        type: 'list',
        name: 'movieList',
        message: 'Which movie list would you like to see?',
        choices: [
          { name: '🌟 Popular Movies', value: 'popular' },
          { name: '⭐ Top Rated Movies', value: 'top_rated' },
          { name: '🆕 Upcoming Movies', value: 'upcoming' },
          { name: '🎭 Now Playing Movies', value: 'now_playing' },
        ],
      },
    ]);

    switch (movieList) {
      case 'popular':
        await this.searchController.getPopularMovies({ page: '1' });
        break;
      case 'top_rated':
        await this.searchController.getTopRatedMovies({ page: '1' });
        break;
      case 'upcoming':
        await this.searchController.getUpcomingMovies({ page: '1' });
        break;
      case 'now_playing':
        await this.searchController.getNowPlayingMovies({ page: '1' });
        break;
    }
  }

  private async handleTvListsBrowse() {
    const { tvList } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tvList',
        message: 'Which TV show list would you like to see?',
        choices: [
          { name: '🌟 Popular TV Shows', value: 'popular' },
          { name: '⭐ Top Rated TV Shows', value: 'top_rated' },
          { name: '📺 Airing Today', value: 'airing_today' },
          { name: '🔴 On The Air', value: 'on_the_air' },
        ],
      },
    ]);

    switch (tvList) {
      case 'popular':
        await this.searchController.getPopularTvShows({ page: '1' });
        break;
      case 'top_rated':
        await this.searchController.getTopRatedTvShows({ page: '1' });
        break;
      case 'airing_today':
        await this.searchController.getAiringTodayTvShows({ page: '1' });
        break;
      case 'on_the_air':
        await this.searchController.getOnTheAirTvShows({ page: '1' });
        break;
    }
  }

  private async handlePeopleListsBrowse() {
    await this.searchController.getPopularPeople({ page: '1' });
  }

  private async handleAdvancedSearch() {
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'What type of advanced search would you like to perform?',
        choices: [
          { name: '🎬 Advanced Movie Discovery', value: 'movie_advanced' },
          { name: '📺 Advanced TV Show Discovery', value: 'tv_advanced' },
          { name: '🔙 Back to Main Menu', value: 'back' },
        ],
      },
    ]);

    if (searchType === 'back') return;

    if (searchType === 'movie_advanced') {
      await this.movieDiscoverSearch();
    } else if (searchType === 'tv_advanced') {
      await this.tvDiscoverSearch();
    }
  }
}
