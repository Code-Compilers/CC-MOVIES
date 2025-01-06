import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.releaseYear}</p>
      <p>{movie.rating}</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;