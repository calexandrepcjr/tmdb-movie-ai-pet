import React from 'react';
import { Link } from 'react-router-dom';

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

interface TvShowCardProps {
  tvShow: TvShow;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ tvShow }) => {
  const placeholderUrl = `https://placehold.co/500x750/374151/ffffff?text=${encodeURIComponent(tvShow.name)}`;
  
  const imageUrl = tvShow.posterPath 
    ? `https://image.tmdb.org/t/p/w500${tvShow.posterPath}`
    : placeholderUrl;

  return (
    <Link to={`/tv/${tvShow.id}`} className="movie-card">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt={tvShow.name}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderUrl;
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">
            {tvShow.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            {tvShow.firstAirDate ? new Date(tvShow.firstAirDate).getFullYear() : 'TBA'}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3">
            {tvShow.overview}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-400 text-sm">
              ⭐ {tvShow.voteAverage ? tvShow.voteAverage.toFixed(1) : 'N/A'}
            </span>
            <span className="text-gray-400 text-xs">
              {tvShow.voteCount || 0} votes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
