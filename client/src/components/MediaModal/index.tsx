import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { QUERY_MEDIA_DETAILS } from '../../utils/queries';
import AddReactionForm from '../AddReactionForm';
import './index.css';

type Props = {
  imdbID: string;
  onClose: () => void;
  title: string;
  isWatchlistPage?: boolean
};

const MediaModal = ({ imdbID, onClose, isWatchlistPage = false }: Props) => {
  console.log(imdbID);
  const { loading, data } = useQuery(QUERY_MEDIA_DETAILS, {
    variables: { imdbID },
  });

  const movieData = data?.mediaDetails;

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
      {/* BACKGROUND */}
      <div className="custom-modal-background">
        <motion.div
          className="custom-modal-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()} // Prevent close on inside click
        >
          {/* X BUTTON */}
          <button onClick={onClose} className="close-button">×</button>
          {/* TITLE AND YEAR */}
          <h2 className="title-and-year-txt">{movieData.Title} ({movieData.Year})</h2>
          {/* MOVIE POSTER */}
          <img src={movieData.Poster} alt={movieData.Title} className="modal-poster" />
          {/* PLOT */}
          <h3 className="modal-plot-title">Plot:</h3>
          {/* PLOT DESCRIPTION */}
          <p className="modal-plot-description">{movieData.Plot}</p>
          {movieData.TrailerLink && (
            <a href={movieData.TrailerLink} target="_blank" rel="noopener noreferrer" className="trailer-link">
              🎬 Watch Trailer
            </a>
          )} 
          {/* Only show AddReactionForm if on watchlist page */}
          {isWatchlistPage && <AddReactionForm mediaId={imdbID} />}
        </motion.div>
      </div>
    </div>
  );
};


export default MediaModal;