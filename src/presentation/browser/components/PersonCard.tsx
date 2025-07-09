import React from 'react';
import { Link } from 'react-router-dom';

interface Person {
  id: number;
  name: string;
  profilePath: string;
  popularity: number;
  adult: boolean;
  knownForDepartment: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=500&background=374151&color=ffffff&bold=true`;
  
  const imageUrl = person.profilePath 
    ? `https://image.tmdb.org/t/p/w500${person.profilePath}`
    : placeholderUrl;

  return (
    <Link to={`/person/${person.id}`} className="movie-card">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt={person.name}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderUrl;
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">
            {person.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            {person.knownForDepartment}
          </p>
          <div className="text-gray-300 text-sm">
            <p className="mb-1">Popularity: {person.popularity ? person.popularity.toFixed(1) : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PersonCard;
