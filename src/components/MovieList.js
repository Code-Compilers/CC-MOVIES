import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";
import MovieDetails from "../pages/MovieDetails";

const MovieList = ({ fetchUrl, categoryName }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const handleMovieClick = async (movieId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images,credits,reviews,similar,external_ids`
      );
      setSelectedMovie(response.data);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="movie-list">
      <h2 className="category-name">{categoryName}</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-item"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="movie-poster"
              />
              <h4 className="movie-title">{movie.title || movie.name}</h4>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="movie-popup">
          <div className="movie-popup-overlay" onClick={handleCloseModal} />
          <div className="movie-popup-content">
            <button className="popup-close-btn" onClick={handleCloseModal}>
              ×
            </button>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;