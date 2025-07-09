import React from 'react';
import { useParams } from 'react-router-dom';

const TvShowDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">TV Show Details</h1>
        <p className="text-gray-300">TV Show ID: {id}</p>
        <p className="text-gray-400 mt-4">
          This page will show detailed information about the TV show including seasons, 
          episodes, cast, and recommendations.
        </p>
      </div>
    </div>
  );
};

export default TvShowDetailsPage;
