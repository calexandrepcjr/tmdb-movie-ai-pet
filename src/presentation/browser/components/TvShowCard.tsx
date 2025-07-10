import React from 'react';
import { Link } from 'react-router-dom';
import { TvShow } from '../../../domain/entities/tvShow';

interface TvShowCardProps {
  tvShow: TvShow;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ tvShow }) => {
  const placeholderUrl = `https://placehold.co/500x750/374151/ffffff?text=${encodeURIComponent(tvShow.name)}`;
  
  const imageUrl = tvShow.getPosterUrl() || placeholderUrl;

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
            {tvShow.getFirstAirYear()}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3">
            {tvShow.overview}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-400 text-sm">
              ⭐ {tvShow.getFormattedVoteAverage()}
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
