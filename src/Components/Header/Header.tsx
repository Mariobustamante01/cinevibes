import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="header">
      <div className="logo">CineVibes</div>
      <nav className="nav">
        <a href="#inicio" className="nav-link">
          Inicio
        </a>
        <a href="#peliculas" className="nav-link">
          Películas
        </a>
        <a href="#programas-tv" className="nav-link">
          Series
        </a>
      </nav>
      <div className="right-side">
        {searchOpen ? (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar..."
              className="search-input"
            />
            <button className="close-button" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          </div>
        ) : (
          <button className="search-button" onClick={toggleSearch}>
            <SearchIcon />
          </button>
        )}
        <button className="subscriptions-button">Suscripciones</button>
        <button className="join-prime-button">Login</button>
      </div>
    </header>
  );
};

export default Header;
