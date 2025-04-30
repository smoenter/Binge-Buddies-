import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';

type Props = {
  imdbID: string;
  onClose: () => void;
};

const MediaModal = ({ imdbID, onClose }: Props) => {
    const [movieData, setMovieData] = useState<null | {
      Title: string;
      Poster?: string;
      Plot: string;
      Year: string;
      imdbID: string;
      TrailerLink?: string;
    }>(null);
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const res = await fetch(`/api/details/${imdbID}`);
          const data = await res.json();
          setMovieData(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMovieDetails();
    }, [imdbID]);
  
    if (loading || !movieData) {
      return (
        <div className="custom-modal-overlay" onClick={onClose}>
          <motion.div className="custom-modal-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Loading...</p>
          </motion.div>
        </div>
      );
    }
  
    return (
      <div className="custom-modal-overlay" onClick={onClose}>
        <motion.div
          className="custom-modal-content"
          initial={{ opacity: 0, scale: 0.9, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="close-button">×</button>
          <h2>{movieData.Title} ({movieData.Year})</h2>
          <img src={movieData.Poster} alt={movieData.Title} className="modal-poster" />
          <p className="modal-plot-description">{movieData.Plot}</p>
          {movieData.TrailerLink && (
            <a href={movieData.TrailerLink} target="_blank" rel="noopener noreferrer" className="trailer-link">
              🎬 Watch Trailer
            </a>
          )}
        </motion.div>
      </div>
    );
  };
  

export default MediaModal;