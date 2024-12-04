import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_KEY = '5d63599f'; // Better to move this to environment variables
  const BASE_URL = 'https://www.omdbapi.com';

  useEffect(() => {
    fetchInitialMovies();
  }, []);

  const fetchInitialMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/?s=5d63599f&apikey=${API_KEY}`
      );
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === '') return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${BASE_URL}/?s=${search.trim()}&apikey=${API_KEY}`
      );
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (error) {
      setError('Failed to fetch movies');
      setMovies([]);
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Database</h1>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="loading">Loading movies...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg'} 
              alt={movie.Title}
              className="movie-poster"
              onError={(e) => {
                e.target.src = '/placeholder-poster.jpg';
              }}
            />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default HomePage;