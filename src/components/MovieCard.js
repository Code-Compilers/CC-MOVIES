import React from "react";

// Component accepts `movie` as a prop
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Use TMDB image URL
        alt={movie.title}
        className="movie-poster"
      />

      {/* Movie Information */}
      <div className="movie-info">
        <h4 className="movie-title">{movie.title}</h4>
        <p className="movie-category">Rating: {movie.vote_average}</p>{" "}
        {/* Display rating */}
        <p className="movie-release-date">Release Date: {movie.release_date}</p>
        <p className="movie-overview">{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;
