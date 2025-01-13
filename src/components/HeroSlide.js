import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Autoplay, Navigation, Pagination } from "swiper/modules";
=======
import { Navigation, Pagination, Autoplay } from "swiper/modules";
>>>>>>> e8ba6d3b24f338816249237fc1c35c780aecae4a
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

<<<<<<< HEAD
  return React.createElement(
    "div",
    { className: "hero-slide" },
    React.createElement(
      Swiper,
      {
        ref: swiperRef,
        modules: [Navigation, Pagination, Autoplay],
        navigation: true,
        pagination: { clickable: true },
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        className: "hero-swiper",
      },
      loading
        ? React.createElement(
            SwiperSlide,
            { className: "hero-slide-item" },
            React.createElement("p", null, "Loading...")
          )
        : movies.length === 0
        ? React.createElement(
            SwiperSlide,
            { className: "hero-slide-item" },
            React.createElement("p", null, "No movies available")
          )
        : movies.map((movie) =>
            React.createElement(
              SwiperSlide,
              { key: movie.id, className: "hero-slide-item" },
              React.createElement(
                "div",
                { className: "hero-slide-item__content" },
                React.createElement("img", {
                  src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  alt: movie.title || movie.name,
                  className: "hero-slide-item__content__poster",
                })
              )
            )
          ),
      React.createElement(
        "div",
        {
          className: "swiper-button-prev",
          onClick: () => swiperRef.current?.swiper?.slidePrev(),
        },
        null
      ),
      React.createElement(
        "div",
        {
          className: "swiper-button-next",
          onClick: () => swiperRef.current?.swiper?.slideNext(),
        },
        null
      )
    )
=======
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
>>>>>>> e8ba6d3b24f338816249237fc1c35c780aecae4a
  );
};

export default HeroSlide;