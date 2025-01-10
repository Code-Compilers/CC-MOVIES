import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";   // Swiper's general styles
import "swiper/modules/navigation/navigation.min.css";  // Navigation styles

import "./HeroSlide.css";

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchUrl = `${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`;
      console.log("Fetch URL:", fetchUrl);

      try {
        const response = await axios.get(fetchUrl);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.results)) {
          setMovies(response.data.results.slice(0, 4));
        } else {
          console.error("Invalid API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return React.createElement(
    "div",
    { className: "hero-slide" },
    React.createElement(
      Swiper,
      {
        ref: swiperRef,
        modules: [Navigation, Pagination],
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
  );
};

export default HeroSlide;
