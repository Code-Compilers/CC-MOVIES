import "./App.css";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import MovieList from "./components/MovieList";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  const constructFetchUrl = (genreId) => {
    if (genreId) {
      return `${process.env.REACT_APP_BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${process.env.REACT_APP_API_KEY}`;
    }
    return `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;
  };

  const fetchUrl = constructFetchUrl(selectedGenre);

  return (
    <div className="App">
      <HomePage onGenreSelect={setSelectedGenre} />
      <MovieList fetchUrl={fetchUrl} />
    </div>
  );
}

export default App;
