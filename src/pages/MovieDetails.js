import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details-container">
      {/* Hero Section with Backdrop */}
      <div className="movie-hero" style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <div className="hero-content">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}
          <div className="hero-stats">
            <span className="rating">★ {movie.vote_average}/10</span>
            <span className="runtime">{movie.runtime} min</span>
            <span className="release-year">{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content">
        <section className="overview-section">
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </section>

        <section className="trailer-section">
          <h2>Official Trailer</h2>
          <div className="trailer-container">
            {movie.videos?.results?.find(video => video.type === "Trailer" && video.site === "YouTube") ? (
              <iframe
                src={`https://www.youtube.com/embed/${movie.videos.results.find(video => video.type === "Trailer" && video.site === "YouTube").key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        </section>

        <section className="cast-section">
          <h2>Featured Cast</h2>
          <div className="cast-grid">
            {movie.credits?.cast?.slice(0, 9).map(person => (
              <div key={person.id} className="cast-card">
                <div className="cast-image">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt={person.name}
                    onError={(e) => e.target.src = '/placeholder.jpg'}
                  />
                </div>
                <div className="cast-info">
                  <h3>{person.name}</h3>
                  <p>{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;