import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Movies.css";
import Modal from "../Modal/Modal";

interface Pelicula {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface Genre {
  id: number;
  name: string;
}

const Peliculas: React.FC = () => {
  const [peliculas, setPeliculas] = useState<{ [key: string]: Pelicula[] }>({});
  const [generos, setGeneros] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPelicula, setSelectedPelicula] = useState<Pelicula | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchGeneros = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0fd9f48bd1e6d337c443350305e93302&language=en-ES`
      );
      setGeneros(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  const fetchPeliculas = async (genreId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0fd9f48bd1e6d337c443350305e93302&language=en-ES&with_genres=${genreId}&page=1`
      );
      setPeliculas((prevState) => ({
        ...prevState,
        [genreId]: response.data.results,
      }));
    } catch (error) {
      console.error("Error fetching peliculas: ", error);
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  useEffect(() => {
    if (generos.length > 0) {
      generos.forEach((genero) => fetchPeliculas(genero.id));
      setLoading(false);
    }
  }, [generos]);

  const openModal = (pelicula: Pelicula) => {
    setSelectedPelicula(pelicula);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPelicula(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pelicula-container">
      {Object.keys(peliculas).map((genreId) => (
        <div key={genreId} className="pelicula-category">
          <h2>
            {generos.find((genero) => genero.id === Number(genreId))?.name}
          </h2>
          <div className="pelicula-carousel">
            {peliculas[genreId].map((pelicula) => (
              <div
                key={pelicula.id}
                className="pelicula-card"
                onClick={() => openModal(pelicula)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                  alt={pelicula.title}
                  className="pelicula-poster"
                />
                <h3 className="pelicula-title">{pelicula.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        pelicula={selectedPelicula}
      />
    </div>
  );
};

export default Peliculas;
