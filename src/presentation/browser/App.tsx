import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import TvShowDetailsPage from './pages/TvShowDetailsPage';
import PersonDetailsPage from './pages/PersonDetailsPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv/:id" element={<TvShowDetailsPage />} />
            <Route path="/person/:id" element={<PersonDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
