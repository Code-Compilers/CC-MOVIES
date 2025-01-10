import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieCard.css";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies data and trailers
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/trending/movie/day`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
            },
          }
        );

        const movieData = await Promise.all(
          response.data.results.slice(0, 6).map(async (movie) => {
            const trailerResponse = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/movie/${movie.id}/videos`,
              {
                params: {
                  api_key: process.env.REACT_APP_API_KEY,
                },
              }
            );

            // Get the trailer key (first trailer of type "Trailer" and site "YouTube")
            const trailer = trailerResponse.data.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            return {
              ...movie,
              trailerKey: trailer ? trailer.key : null,
            };
          })
        );

        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="movies-grid">
      {loading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-card">
              {/* Poster image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />

              {/* Floating trailer card */}
              {movie.trailerKey && (
                <div className="floating-card">
                  {/* Display trailer iframe */}
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Movie title */}
              <div className="movie-title">{movie.title || movie.name}</div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default MovieCard;
