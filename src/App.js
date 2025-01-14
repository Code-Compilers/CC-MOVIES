import "./App.css";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import MovieList from "./components/MovieList";
import HeroSlide from "./components/HeroSlide";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [categoryName, setCategoryName] = useState("Popular");
  const [searchResults, setSearchResults] = useState([]);

  const constructFetchUrl = (genreId) => {
    if (genreId) {
      return `${process.env.REACT_APP_BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${process.env.REACT_APP_API_KEY}`;
    }
    return `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;
  };

  const handleGenreSelect = (genreId, genreName) => {
    setSelectedGenre(genreId);
    setCategoryName(genreName);
  };

  const handleSearch = async (searchTerm) => {
    const searchUrl = `${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSearchResults(data.results);
      setCategoryName(`Search Results: ${searchTerm}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const fetchUrl = constructFetchUrl(selectedGenre);

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <HeroSlide />
      <MovieCard />
      <HomePage onGenreSelect={handleGenreSelect} />
      <MovieList 
        fetchUrl={fetchUrl} 
        categoryName={categoryName}
        movies={searchResults.length > 0 ? searchResults : null} 
      />
    </div>
  );
}

export default App;