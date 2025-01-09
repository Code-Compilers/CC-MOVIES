import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar"; // Ensure the path is correct
import "./HomePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage = ({ onGenreSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // For managing loading state
  const [movies, setMovies] = useState([]); // For storing fetched movies

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

  // Fetch initial movies
  //const fetchMovies = async () => {
  //  setLoading(true);
  // try {
  //  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`);
  //  setMovies(response.data.results);
  //} catch (error) {
  //  console.error('Error fetching movies:', error);
  //} finally {
  // setLoading(false);
  // }
  ///}/;

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
              <li onClick={() => onGenreSelect("", "Popular")}>Popular</li>
              {genres.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => onGenreSelect(genre.id, genre.name)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {loading && <p>Loading...</p>}
      {/* Movies list */}
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
