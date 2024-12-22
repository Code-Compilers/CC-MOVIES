import { useState, useEffect } from "react";
import axios from "axios";
import "./Row.css";
import  tmdb from "../tmdApi";

const Row = ({title, fetchUrl, searchTerm}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await tmdb.get(fetchUrl);
                setMovies(response.data.results);
            }catch(error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchData();
    }, [fetchUrl]);

    useEffect(() => {
      // Filter movies when search term changes
      console.log("Movies Loaded:", movies); // Log the movies loaded
      if (searchTerm) {
        const filtered = movies.filter((movie) =>
          (movie.title || movie.name).toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
      } else {
        setFilteredMovies(movies);
      }
    }, [searchTerm, movies]);

    
    const handleClick = async (movie) => {
        try {
          const response = await tmdb.get(`/movie/${movie.id}/videos`);
          console.log("Video data:", response.data); // Debug response
          const trailer = response.data.results.find(
            (video) => video.type === "Trailer"
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }else {
            console.error("No trailer found");
        }
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
        }
      };

      const handleClose = () => {
        setTrailerUrl("");
      };

    return (
        <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="row__poster-item">
              <img
                className="row__poster"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title || movie.name}
                onClick={() => handleClick(movie)} // Show trailer on click
              />
              <h3>{movie.title || movie.name}</h3>
            </div>
          ))}
        </div>
  
        {/* Trailer Modal */}
        {trailerUrl && (
          <div className="modal">
            <div className="modal__content">
              <span className="modal__close" onClick={handleClose}>
                &times;
              </span>
              <iframe
                width="560"
                height="315"
                src={trailerUrl}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        </div>
    )
};

export default Row;