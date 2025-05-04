import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REACTIONS } from '../../utils/queries';
import CommentForm from '../CommentForm';

import './index.css';

const ReactionList = ({ mediaId }: { mediaId: string }) => {

  const { loading: reactionLoading, error: reactionError, data } = useQuery(GET_REACTIONS, {
    variables: { mediaId },
  });

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const toggleCommentForm = (reactionId: string) => {
    setActiveCommentId((prev) => (prev === reactionId ? null : reactionId));
  };


  if (reactionLoading) return <p>Loading reactions...</p>;
  if (reactionError) return <p>Error loading reactions.</p>;

  return (
    <div>
      <h3>Reactions</h3>
      {data.reactions.length === 0 ? (
        <p>No reactions yet.</p>
      ) : (
        data.reactions.map((r: any) => (
          <div key={r._id} className="reaction-card">
            <p>{r.comment}</p>
            <p>Season {r.season}, Episode {r.episode}</p>
            <p>Rating: {r.rating}</p>
            <small>{new Date(r.createdAt).toLocaleString()}</small>

            <button onClick={() => toggleCommentForm(r._id)}>
              <img
                src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
                alt="comment icon"
                style={{ width: '24px', height: '24px' }}
              />
            </button>

            {activeCommentId === r._id && <CommentForm thoughtId={r._id} />}

          </div>
        ))
      )}
    </div>
  );
};

export default ReactionList;