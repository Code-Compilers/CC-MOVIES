import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar'; // Ensure the path is correct
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch initial movies
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle search term changes and submit
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${term}`);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="title">CC Movies</h1>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {/* Dropdown genres */}
            <li>Action</li>
            <li>Comedy</li>
            <li>Drama</li>
            {/* More genres */}
          </ul>
        </div>
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {loading ? (
          <div>Loading movies...</div>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '/placeholder-poster.jpg';
                }}
              />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
