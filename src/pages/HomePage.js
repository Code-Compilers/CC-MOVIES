import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import SearchBar from '../components/SearchBar'; // Ensure the path is correct
import './HomePage.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage = ({ onGenreSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Add this new function to handle movie clicks
  const handleMovieClick = async (movieId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images,credits,reviews,similar,external_ids`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search term changes and submit
  const handleSearch = async (term) => {
    console.log("Search term:", term); // Debug log
    setSearchTerm(term);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
      );
      console.log("Search results:", response.data.results); // Debug log
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="title">CC Movies</h1>
        <SearchBar onSearch={handleSearch} />

        <div className="navbarlinks">
          <button className="hamburger" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          {isMenuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => {onGenreSelect("", "Popular"); setIsMenuOpen(false)}}>Popular</li>
              {genres.map((genre) => (
                <li key={genre.id} onClick={() => {onGenreSelect(genre.id, genre.name); setIsMenuOpen(false)}}>
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      <div className="container">
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={handleBack} />
        ) : (
          movies.length > 0 && (
            <div className="movies-grid">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="movie-poster"
                  />
                  <h3 className="movie-title">{movie.title}</h3>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
