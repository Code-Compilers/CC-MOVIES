import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';  // Correct for going up one directory
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Using TMDB API key
  const BASE_URL = 'https://api.themoviedb.org/3'; 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch initial movies when component mounts
  useEffect(() => {
    fetchInitialMovies();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch movies based on search term
  const fetchInitialMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/?s=batman&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // This function will be passed down to the SearchBar component
  const handleSearch = async (searchTerm) => {
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/?s=${searchTerm}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);  // Clear movies if no results are found
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);  // Clear movies if an error occurs
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to MovieLand</h1>

      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>Action</li>
          <li>Comedy</li>
          <li>Drama</li>
          <li>Horror</li>
          <li>Sci-Fi</li>
          <li>Romance</li>
          <li>Thriller</li>
          <li>Fantasy</li>
          <li>Mystery</li>
          <li>Animation</li>
          <li>Documentary</li>
          <li>Crime</li>
          <li>Adventure</li>
          <li>Family</li>
          <li>War</li>
        </ul>
      </div>

      {/* SearchBar component integrated here */}
      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading movies...</div>}

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
