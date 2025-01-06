import React from 'react';
import MovieList from '../components/MovieList';

const HomePage = ({ movies }) => {
  return (
    <div>
      <h2>Welcome to the CC Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
