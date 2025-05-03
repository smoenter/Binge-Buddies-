import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { QUERY_MEDIA_DETAILS } from '../../utils/queries';
import Star from '../Star';
import './index.css';

type Props = {
  imdbID: string;
  onClose: () => void;
  title: string;
};

const MediaModal = ({ imdbID, onClose }: Props) => {
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
        <h2>{movieData.Title} ({movieData.Year})</h2>
        {/* MOVIE POSTER */}
        <img src={movieData.Poster} alt={movieData.Title} className="modal-poster" />
        {/* PLOT */}
        <p className="modal-plot-description">{movieData.Plot}</p>
        {/* STAR */}
        <Star saved={movieData.Saved} imdbID={imdbID} />
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