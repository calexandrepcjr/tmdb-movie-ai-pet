import React, { useState, useEffect } from 'react';
import { useMovieSearch } from '../hooks/useMovieSearch';
import MovieCard from '../components/MovieCard';
import TvShowCard from '../components/TvShowCard';
import PersonCard from '../components/PersonCard';

// Define interfaces for the API response data
import { Movie } from '../../../domain/entities/movie';
import { TvShow } from '../../../domain/entities/tvShow';
import { Person } from '../../../domain/entities/person';

// Sort options for different content types
type SortOption = 'popularity' | 'vote_average' | 'release_date' | 'title';

const sortOptions: Record<string, { value: SortOption; label: string }[]> = {
  movies: [
    { value: 'popularity', label: 'Popularity' },
    { value: 'vote_average', label: 'Rating' },
    { value: 'release_date', label: 'Release Date' },
    { value: 'title', label: 'Title' }
  ],
  tv: [
    { value: 'popularity', label: 'Popularity' },
    { value: 'vote_average', label: 'Rating' },
    { value: 'release_date', label: 'First Air Date' },
    { value: 'title', label: 'Name' }
  ],
  people: [
    { value: 'popularity', label: 'Popularity' },
    { value: 'title', label: 'Name' }
  ]
};

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'movies' | 'tv' | 'people'>('movies');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const { loading, error, searchMovies, searchTvShows, searchPeople } = useMovieSearch();

  const handleSearch = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;

    setCurrentPage(page);
    
    try {
      if (activeTab === 'movies') {
        const result = await searchMovies(searchQuery, { page });
        if (result.success && result.data) {
          setMovies(result.data.results);
          setTotalPages(result.data.totalPages);
          // Sort immediately after setting results
          setTimeout(() => sortResults(sortBy), 0);
        }
      } else if (activeTab === 'tv') {
        const result = await searchTvShows(searchQuery, { page });
        if (result.success && result.data) {
          setTvShows(result.data.results);
          setTotalPages(result.data.totalPages);
          // Sort immediately after setting results
          setTimeout(() => sortResults(sortBy), 0);
        }
      } else if (activeTab === 'people') {
        const result = await searchPeople(searchQuery, { page });
        if (result.success && result.data) {
          setPeople(result.data.results);
          setTotalPages(result.data.totalPages);
          // Sort immediately after setting results
          setTimeout(() => sortResults(sortBy), 0);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleTabChange = (tab: 'movies' | 'tv' | 'people') => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSortBy('popularity'); // Reset to default sort when changing tabs
    
    // Clear previous results when changing tabs
    setMovies([]);
    setTvShows([]);
    setPeople([]);
    
    if (query.trim()) {
      handleSearch(query, 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (query.trim()) {
      handleSearch(query, page);
    }
  };

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    // Sort the current results immediately
    sortResults(newSortBy);
  };

  const sortResults = (sortBy: SortOption) => {
    const sortFunction = (a: Movie | TvShow | Person, b: Movie | TvShow | Person) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'popularity':
          if (activeTab === 'movies') {
            aValue = (a as Movie).popularity || 0;
            bValue = (b as Movie).popularity || 0;
          } else if (activeTab === 'tv') {
            aValue = (a as TvShow).popularity || 0;
            bValue = (b as TvShow).popularity || 0;
          } else if (activeTab === 'people') {
            aValue = (a as Person).popularity || 0;
            bValue = (b as Person).popularity || 0;
          }
          return (bValue || 0) - (aValue || 0); // Descending order
        case 'vote_average':
          if (activeTab === 'movies') {
            aValue = (a as Movie).voteAverage || 0;
            bValue = (b as Movie).voteAverage || 0;
          } else if (activeTab === 'tv') {
            aValue = (a as TvShow).voteAverage || 0;
            bValue = (b as TvShow).voteAverage || 0;
          }
          return (bValue || 0) - (aValue || 0); // Descending order
          return bValue - aValue; // Descending order
        case 'release_date':
          if (activeTab === 'movies') {
            aValue = (a as Movie).releaseDate ? (a as Movie).releaseDate!.getTime() : 0;
            bValue = (b as Movie).releaseDate ? (b as Movie).releaseDate!.getTime() : 0;
          } else if (activeTab === 'tv') {
            aValue = (a as TvShow).firstAirDate ? (a as TvShow).firstAirDate!.getTime() : 0;
            bValue = (b as TvShow).firstAirDate ? (b as TvShow).firstAirDate!.getTime() : 0;
          } else {
            aValue = 0;
            bValue = 0;
          }
          return (bValue || 0) - (aValue || 0); // Descending order (newest first)
        case 'title':
          if (activeTab === 'movies') {
            aValue = (a as Movie).title || '';
            bValue = (b as Movie).title || '';
          } else if (activeTab === 'tv') {
            aValue = (a as TvShow).name || '';
            bValue = (b as TvShow).name || '';
          } else if (activeTab === 'people') {
            aValue = (a as Person).name || '';
            bValue = (b as Person).name || '';
          }
          return aValue.localeCompare(bValue); // Ascending order
        default:
          return 0;
      }
    };

    if (activeTab === 'movies') {
      setMovies(prev => [...prev].sort(sortFunction as (a: Movie, b: Movie) => number));
    } else if (activeTab === 'tv') {
      setTvShows(prev => [...prev].sort(sortFunction as (a: TvShow, b: TvShow) => number));
    } else if (activeTab === 'people') {
      setPeople(prev => [...prev].sort(sortFunction as (a: Person, b: Person) => number));
    }
  };

  useEffect(() => {
    if (query.trim()) {
      handleSearch(query, 1);
    }
  }, [activeTab]);

  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 p-8">
          <p>Error: {error}</p>
        </div>
      );
    }

    const results = activeTab === 'movies' ? movies : 
                   activeTab === 'tv' ? tvShows : people;

    if (results.length === 0 && query.trim()) {
      return (
        <div className="text-center text-gray-400 p-8">
          <p>No results found for "{query}"</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'movies' && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {activeTab === 'tv' && tvShows.map((tvShow) => (
          <TvShowCard key={tvShow.id} tvShow={tvShow} />
        ))}
        {activeTab === 'people' && people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-8">
        <div className="flex items-center">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 mx-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {pages}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 mx-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        
        {/* Search Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query, 1);
          }}
          className="max-w-md mx-auto mb-6"
        >
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows, or people..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Tabs */}
        <div className="flex justify-center space-x-1 mb-6">
          {(['movies', 'tv', 'people'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        {query.trim() && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="text-gray-300 font-medium">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                {sortOptions[activeTab].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {renderResults()}
      
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default SearchPage;
