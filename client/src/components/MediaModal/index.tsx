import { motion } from "framer-motion";
import "./index.css";

type Props = {
  title: string;
  poster: string;
  plot: string;
  year: string;
  trailerLink: string;
  onClose: () => void;
};

const MediaModal = ({ title, poster, plot, year, trailerLink, onClose }: Props) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          <button onClick={onClose} className="close-button">×</button>
          <h2>{title} ({year})</h2>
          <img src={poster} alt={title} className="modal-poster" />
          <p className="modal-plot">{plot}</p>
          <a href={trailerLink} target="_blank" rel="noopener noreferrer" className="trailer-link">
            🎬 Watch Trailer
          </a>
        </motion.div>
      </div>
    );
  };
  
  export default MediaModal;