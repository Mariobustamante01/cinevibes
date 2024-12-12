import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import "./Modal.css";
import axios from "axios";
interface Pelicula {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string; // Added backdrop_path for horizontal image
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  pelicula: Pelicula | null;
}

const PeliculaModal: React.FC<ModalProps> = ({ open, onClose, pelicula }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [showPoster, setShowPoster] = useState<boolean>(false);

  useEffect(() => {
    if (pelicula) {
      setShowPoster(false); // Reset to show trailer first
      const fetchTrailer = async () => {
        try {
          const responseLatino = await axios.get(
            `https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=0fd9f48bd1e6d337c443350305e93302&language=es-MX`
          );

          let trailer = responseLatino.data.results.find(
            (video: any) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (!trailer) {
            const responseEspanol = await axios.get(
              `https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=0fd9f48bd1e6d337c443350305e93302&language=es-ES`
            );
            trailer = responseEspanol.data.results.find(
              (video: any) =>
                video.type === "Trailer" && video.site === "YouTube"
            );
          }

          if (!trailer) {
            const responseIngles = await axios.get(
              `https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=0fd9f48bd1e6d337c443350305e93302&language=en-US`
            );
            trailer = responseIngles.data.results.find(
              (video: any) =>
                video.type === "Trailer" && video.site === "YouTube"
            );
          }

          setTrailerUrl(
            trailer
              ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
              : null
          );
        } catch (error) {
          console.error("Error fetching trailer:", error);
          setTrailerUrl(null);
        }
      };

      fetchTrailer();
    }
  }, [pelicula]);

  const handleTrailerEnd = () => {
    setShowPoster(true); // Show poster when the trailer ends
  };

  if (!pelicula) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {trailerUrl && !showPoster ? (
          <iframe
            width="100%"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onEnded={handleTrailerEnd} // Detect when trailer ends
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`}
            alt={pelicula.title}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        <Typography variant="h6" gutterBottom>
          {pelicula.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {pelicula.overview}
        </Typography>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrowIcon />}
          >
            Reproducir
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<AddIcon />}>
            Añadir a la lista
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PeliculaModal;
