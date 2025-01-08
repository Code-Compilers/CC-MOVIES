import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";

const MovieList = ({ fetchUrl, categoryName }) => {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null); // Added state for movie details
  const [showTrailer, setShowTrailer] = useState(false);
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
  }, [fetchUrl]); // Re-run whenever fetchUrl changes

  const handlePosterClick = async (movieId) => {
    try {
      // Fetch movie details
      const movieResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );

      setMovieDetails(movieResponse.data);

      // Fetch trailer
      const trailerResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );

      const trailer = trailerResponse.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("Trailer not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching movie or trailer details:", error);
    }
  };

  return (
    <div className="movie-list">
      {/*Display the category Name*/}
      <h2 className="category-name">{categoryName}</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
       
        movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handlePosterClick(movie.id)}
          >
            
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="movie-poster"
            />
            <h4 className="movie-title">{movie.title || movie.name}</h4>
            
          </div>
        ))
      )}

      {/* Trailer Modal */}
      {showTrailer && trailerKey && movieDetails && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <div className="trailer-card">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="description-card">
              <h2 className="movie-title">
                {movieDetails.title || movieDetails.name}
              </h2>
               <h5 className="movie-date">
                Release Date: {movieDetails.release_date || movieDetails.first_air_date}
              </h5>
              <h5 className="movie-rating">
                Rating: {movieDetails.vote_average}/10
              </h5>
              <p className="movie-overview">{movieDetails.overview}</p>
              <button
                className="close-btn"
                onClick={() => {
                  setShowTrailer(false);
                  setMovieDetails(null); // Clear movie details
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
