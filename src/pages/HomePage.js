import { useState } from "react";
import "./HomePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage = ({ onGenreSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
      />

      <div className="navbarlinks">
        <button className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        {isMenuOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => onGenreSelect("")}>Popular</li>
            {genres.map((genre) => (
              <li key={genre.id} onClick={() => onGenreSelect(genre.id)}>
                {genre.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default HomePage;
