import { DIConfiguration } from './src/infrastructure/di/DIConfiguration';
import { TvShowRepository } from './src/infrastructure/repositories/tmdb/TvShowRepository';
import { PersonRepository } from './src/infrastructure/repositories/tmdb/PersonRepository';

async function testTrendingAPIs() {
  console.log('Testing Trending APIs...');
  
  try {
    // Test TV Shows
    console.log('Testing popular TV shows...');
    const tvShowRepository = DIConfiguration.getContainer().resolve<TvShowRepository>('TvShowRepository');
    const tvResult = await tvShowRepository.getPopularTvShows(1);
    console.log(`TV Shows: Found ${tvResult.results.length} results`);
    console.log(`First TV Show: ${tvResult.results[0]?.name}`);
    
    // Test People
    console.log('Testing popular people...');
    const personRepository = DIConfiguration.getContainer().resolve<PersonRepository>('PersonRepository');
    const peopleResult = await personRepository.getPopularPeople(1);
    console.log(`People: Found ${peopleResult.results.length} results`);
    console.log(`First Person: ${peopleResult.results[0]?.name}`);
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTrendingAPIs();
