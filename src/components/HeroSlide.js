import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./HeroSlide.css";

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`
        );
        setMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="hero-swiper"
      >
        {loading ? (
          <SwiperSlide className="hero-slide-item">
            <p>Loading...</p>
          </SwiperSlide>
        ) : (
          movies.map((movie) => (
            <SwiperSlide key={movie.id} className="hero-slide-item">
              <div className="hero-slide-backdrop" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className="hero-slide-content">
                  <div className="hero-slide-info">
                    <h2>{movie.title}</h2>
                    <p className="overview">{movie.overview}</p>
                    <div className="movie-stats">
                      <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
                      <span className="release-date">{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                  <div className="hero-slide-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default HeroSlide;