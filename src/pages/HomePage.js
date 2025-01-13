import React, { useState } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import SearchBar from '../components/SearchBar';
import './HomePage.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage = ({ onGenreSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = async (movieId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images,credits,reviews,similar,external_ids`
      );
      setSelectedMovie(response.data);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenreClick = (genreId, genreName) => {
    onGenreSelect(genreId, genreName);
    setIsMenuOpen(false);
    const movieListElement = document.querySelector('.movie-list');
    movieListElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${term}`
      );
      setMovies(response.data.results || []);
      
      const moviesGrid = document.querySelector('.movies-grid');
      if (moviesGrid) {
        moviesGrid.scrollIntoView({ behavior: 'smooth' });
      }
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
                <li key={genre.id} onClick={() => handleGenreClick(genre.id, genre.name)}>
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      <div className="container">
        {searchTerm && movies.length > 0 && (
          <h2 className="search-results-header">
            Search Results for "{searchTerm}"
          </h2>
        )}
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

        {selectedMovie && (
          <div className="movie-popup">
            <div className="movie-popup-overlay" onClick={handleCloseModal} />
            <div className="movie-popup-content">
              <button className="popup-close-btn" onClick={handleCloseModal}>×</button>
              <MovieDetails movie={selectedMovie} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;