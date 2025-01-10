import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = ({ movie, onBack }) => {
  const [franchiseMovies, setFranchiseMovies] = useState([]);

  useEffect(() => {
    const fetchFranchiseMovies = async () => {
      if (movie.belongs_to_collection) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/collection/${movie.belongs_to_collection.id}?api_key=${process.env.REACT_APP_API_KEY}`
          );
          setFranchiseMovies(response.data.parts.slice(0, 4));
        } catch (error) {
          console.error("Error fetching franchise movies:", error);
        }
      }
    };

    fetchFranchiseMovies();
  }, [movie]);

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={onBack}>Back to Search Results</button>
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
        <div className="movie-stats-grid">
          <div className="stat-item">
            <div className="stat-value">${movie.budget?.toLocaleString()}</div>
            <div className="stat-label">Budget</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">${movie.revenue?.toLocaleString()}</div>
            <div className="stat-label">Revenue</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{movie.vote_count}</div>
            <div className="stat-label">Vote Count</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{movie.popularity?.toFixed(1)}</div>
            <div className="stat-label">Popularity</div>
          </div>
        </div>

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

        {movie.watchProviders?.results?.US && (
          <section className="watch-section">
            <h2>Where to Watch</h2>
            <div className="providers-grid">
              {movie.watchProviders.results.US.flatrate?.map(provider => (
                <div key={provider.provider_id} className="provider-card">
                  <img 
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                  <p>{provider.provider_name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {movie.keywords?.keywords?.length > 0 && (
          <section className="keywords-section">
            <h2>Keywords</h2>
            <div className="keyword-tags">
              {movie.keywords.keywords.map(keyword => (
                <span key={keyword.id} className="keyword-tag">
                  {keyword.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {franchiseMovies.length > 0 && (
          <section className="similar-section">
            <h2>Movies in the Same Franchise</h2>
            <div className="similar-grid">
              {franchiseMovies.map(similar => (
                <div key={similar.id} className="similar-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                    alt={similar.title}
                  />
                  <h3>{similar.title}</h3>
                  <p>{new Date(similar.release_date).getFullYear()}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;