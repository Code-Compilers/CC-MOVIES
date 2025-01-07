import React from 'react'

const MovieCard = () => {
  return (
    <div className="movie-card">
      <img src={movie.poster_path} alt={movie.title} /> 
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p> 
      <p>{movie.overview.substring(0, 100)}...</p> 
    </div>
  );
}

export default MovieCard
