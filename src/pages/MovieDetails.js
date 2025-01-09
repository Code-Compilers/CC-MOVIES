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

        {movie.videos?.length > 0 && (
          <section className="trailer-section">
            <h2>Official Trailer</h2>
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="cast-section">
          <h2>Featured Cast</h2>
          <div className="cast-grid">
            {movie.cast?.map(person => (
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

        <section className="crew-section">
          <h2>Key Crew</h2>
          <div className="crew-grid">
            {movie.crew?.filter(person => 
              ['Director', 'Screenplay', 'Story', 'Producer'].includes(person.job)
            ).map(person => (
              <div key={person.id} className="crew-card">
                <h3>{person.name}</h3>
                <p>{person.job}</p>
              </div>
            ))}
          </div>
        </section>

        {movie.watchProviders?.US && (
          <section className="watch-section">
            <h2>Where to Watch</h2>
            <div className="providers-grid">
              {movie.watchProviders.US.flatrate?.map(provider => (
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

        {movie.reviews?.length > 0 && (
          <section className="reviews-section">
            <h2>User Reviews</h2>
            <div className="reviews-grid">
              {movie.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <h3>{review.author}</h3>
                    <span>★ {review.author_details.rating}/10</span>
                  </div>
                  <p>{review.content.slice(0, 300)}...</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {movie.images?.backdrops.length > 0 && (
          <section className="gallery-section">
            <h2>Behind the Scenes</h2>
            <div className="gallery-grid">
              {movie.images.backdrops.slice(0, 6).map((image, index) => (
                <img 
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Behind the scenes ${index + 1}`}
                />
              ))}
            </div>
          </section>
        )}

        {movie.keywords?.length > 0 && (
          <section className="keywords-section">
            <h2>Keywords</h2>
            <div className="keyword-tags">
              {movie.keywords.map(keyword => (
                <span key={keyword.id} className="keyword-tag">
                  {keyword.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="external-links">
          <h2>External Links</h2>
          <div className="links-grid">
            {movie.externalIds?.imdb_id && (
              <a href={`https://www.imdb.com/title/${movie.externalIds.imdb_id}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="external-link">
                IMDb
              </a>
            )}
          </div>
        </section>
          <section className="similar-section">
            <h2>Similar Movies</h2>
            <div className="similar-grid">
              {movie.similar?.results?.map(similar => (
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
        </div>
    </div>
  );
};

export default MovieDetails;