import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieCard.css";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
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
        setMovies(response.data.results.slice(0, 6)); // Get the first 6 trending movies
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className="trending-movies-section">
      <h2 className="section-title">Trending Movies</h2>
      <div className="movies-grid">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length === 0 ? (
          <p>No trending movies available.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="movie-poster"
              />
              <h4 className="movie-title">{movie.title || movie.name}</h4>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MovieCard;
