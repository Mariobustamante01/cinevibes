import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description =
    "En Black Widow, Natasha Romanoff, conocida como la Viuda Negra, enfrenta las partes más oscuras de su pasado cuando una peligrosa conspiración relacionada con su historia de espía emerge. Mientras es perseguida por una fuerza dispuesta a todo para destruirla, Natasha debe enfrentarse a las relaciones rotas que dejó atrás y a las decisiones de su pasado como espía, mientras trata de proteger a los que le importan.";

  const truncatedText = isExpanded
    ? description
    : description.length > 150
    ? description.substring(0, 150) + "..."
    : description;

  return (
    <div className="movie-card">
      <div className="movie-info">
        <img
          src="https://image.tmdb.org/t/p/original/nPAytGfFRMLE2b3iUzbSPWbt8mv.png"
          alt=""
        />
        <p className="movie-details">
          13+ • Action, Science Fiction, Comedy • 2021 • 2h 13m
        </p>
        <div className="buttons">
          <button className="play-button">PLAY</button>
          <button className="list-button">+ MY LISTA</button>
        </div>
        <p className="movie-description">
          {truncatedText}
          {description.length > 150 && (
            <span
              className="read-more"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? " Ver Menos" : " Ver Más"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
