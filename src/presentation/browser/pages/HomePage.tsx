import React, { useState, useEffect } from 'react';
import { useMovieSearch } from '../hooks/useMovieSearch';
import MovieCard from '../components/MovieCard';
import TvShowCard from '../components/TvShowCard';
import PersonCard from '../components/PersonCard';

// Define interfaces for the API response data
interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  originalTitle: string;
  genreIds: number[];
}

interface TvShow {
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  originalName: string;
  genreIds: number[];
}

interface Person {
  id: number;
  name: string;
  profilePath: string;
  popularity: number;
  adult: boolean;
  knownForDepartment: string;
}

const HomePage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTvShows, setTrendingTvShows] = useState<TvShow[]>([]);
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const movieSearchHook = useMovieSearch();

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if API key is valid
        if (!movieSearchHook.isApiKeyValid()) {
          setError('TMDB API key is not configured. Please add your API key to .env file.');
          return;
        }

        // Fetch popular movies
        const moviesResult = await movieSearchHook.getPopularMovies({ page: 1 });
        if (moviesResult.success && moviesResult.data) {
          setTrendingMovies(moviesResult.data.results.slice(0, 6));
        } else {
          setError(moviesResult.error || 'Failed to fetch movies');
        }

        // Fetch popular TV shows  
        const tvResult = await movieSearchHook.getPopularTvShows({ page: 1 });
        if (tvResult.success && tvResult.data) {
          setTrendingTvShows(tvResult.data.results.slice(0, 6));
        } else {
          setError(tvResult.error || 'Failed to fetch TV shows');
        }

        // Fetch popular people
        const peopleResult = await movieSearchHook.getPopularPeople({ page: 1 });
        if (peopleResult.success && peopleResult.data) {
          setTrendingPeople(peopleResult.data.results.slice(0, 6));
        } else {
          setError(peopleResult.error || 'Failed to fetch people');
        }
      } catch (error) {
        console.error('Error fetching trending content:', error);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingContent();
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
          <p className="mb-2">{error}</p>
          <div className="text-sm">
            <p>To fix this:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Get your API key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">TMDB Settings</a></li>
              <li>Open the <code>.env</code> file in your project root</li>
              <li>Replace <code>your-api-key-here</code> with your actual API key</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to TMDB Client
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover trending movies, TV shows, and people from The Movie Database
        </p>
      </div>

      {/* Trending Movies */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Trending TV Shows */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending TV Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTvShows.map((tvShow) => (
            <TvShowCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
      </section>

      {/* Trending People */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending People</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPeople.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
