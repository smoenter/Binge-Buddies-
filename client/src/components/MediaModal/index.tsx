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

  console.log('GraphQL query data:', data);

  const mediaData = data?.mediaDetails; // Changed from movieData to mediaData

  if (loading || !mediaData) {
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
      <div className="custom-modal-background">
        <motion.div
          className="custom-modal-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button onClick={onClose} className="close-button">×</button>

          {/* Show reaction form for both movies and series on watchlist page */}
          {isWatchlistPage && <AddReactionForm mediaId={imdbID}/>}
          
          {/* Moved AddReactionForm to bottom and only show for watchlist */}
          <h2 className="title-and-year-txt">{mediaData.Title} ({mediaData.Year})</h2>
          <img src={mediaData.Poster} alt={mediaData.Title} className="modal-poster" />
          
          {/* Show type-specific information */}
          {mediaData.Type === 'series' && (
            <div className="series-info">
              <p>Total Seasons: {mediaData.totalSeasons || 'N/A'}</p>
            </div>
          )}
          
          <h3 className="modal-plot-title">Plot:</h3>
          <p className="modal-plot-description">{mediaData.Plot}</p>
          
          {mediaData.TrailerLink && (
            <a href={mediaData.TrailerLink} target="_blank" rel="noopener noreferrer" className="trailer-link">
              🎬 Watch Trailer
            </a>
          )}
          
        </motion.div>
      </div>
    </div>
  );
};


export default MediaModal;