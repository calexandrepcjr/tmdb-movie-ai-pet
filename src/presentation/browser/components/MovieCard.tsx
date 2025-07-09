import React from 'react';
import { Link } from 'react-router-dom';

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

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const placeholderUrl = `https://placehold.co/500x750/374151/ffffff?text=${encodeURIComponent(movie.title)}`;
  
  const imageUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : placeholderUrl;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderUrl;
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'TBA'}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3">
            {movie.overview}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-400 text-sm">
              ⭐ {movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A'}
            </span>
            <span className="text-gray-400 text-xs">
              {movie.voteCount || 0} votes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
