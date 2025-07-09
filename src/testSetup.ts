#!/usr/bin/env node

// Test script to verify the setup works
import { DIConfiguration } from './infrastructure/di/diConfiguration';
import { ConfigurationService } from './infrastructure/config/configurationService';
import { MovieRepository } from './domain/repositories/movieRepository';
import { TvShowRepository } from './domain/repositories/tvShowRepository';
import { PersonRepository } from './domain/repositories/personRepository';
import { SearchRepository } from './domain/repositories/searchRepository';
import { MovieSearchUseCase } from './application/use-cases/movieSearchUseCase';
import { SearchService } from './domain/services/searchService';
import chalk from 'chalk';

async function testSetup() {
  try {
    console.log(chalk.blue('🧪 Testing TMDB Client Setup...\n'));

    // Test configuration
    const container = DIConfiguration.getContainer();
    const configService = container.resolve<ConfigurationService>('ConfigService');
    console.log(chalk.green('✅ Configuration loaded successfully'));
    console.log(chalk.gray(`Base URL: ${configService.getBaseUrl()}`));
    console.log(chalk.gray(`Language: ${configService.getDefaultLanguage()}`));
    console.log(chalk.gray(`Region: ${configService.getDefaultRegion()}`));

    // Test repositories
    const movieRepository = container.resolve<MovieRepository>('MovieRepository');
    const tvRepository = container.resolve<TvShowRepository>('TvShowRepository');
    const personRepository = container.resolve<PersonRepository>('PersonRepository');
    const searchRepository = container.resolve<SearchRepository>('SearchRepository');

    // Test services
    const searchService = new SearchService(
      movieRepository,
      tvRepository,
      personRepository,
      searchRepository
    );

    // Test use case
    const movieSearchUseCase = new MovieSearchUseCase(searchService);
    console.log(chalk.green('✅ All components initialized successfully'));

    // Test API call if API key is provided
    if (configService.getApiKey() !== 'your_api_key_here') {
      console.log(chalk.blue('\n🔍 Testing API connection...'));
      
      try {
        const result = await movieSearchUseCase.getPopularMovies(1);
        console.log(chalk.green('✅ API connection successful'));
        console.log(chalk.gray(`Found ${result.totalResults} popular movies`));
        console.log(chalk.gray(`First movie: ${result.results[0]?.title}`));
      } catch (error) {
        console.log(chalk.red('❌ API connection failed'));
        console.log(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      }
    } else {
      console.log(chalk.yellow('⚠️  Please set your TMDB_API_KEY in .env to test API connection'));
    }

    console.log(chalk.blue('\n🎉 Setup test completed!'));
    console.log(chalk.gray('You can now use the CLI:'));
    console.log(chalk.gray('  npm start interactive'));
    console.log(chalk.gray('  npm start search-movies "Inception"'));
    console.log(chalk.gray('  npm start popular-movies'));

  } catch (error) {
    console.error(chalk.red('❌ Setup test failed:'), error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

testSetup();
