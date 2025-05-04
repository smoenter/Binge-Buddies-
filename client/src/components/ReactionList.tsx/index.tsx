import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REACTIONS } from '../../utils/queries';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

import './index.css';

const ReactionList = ({ mediaId }: { mediaId: string }) => {

  const { loading: reactionLoading, error: reactionError, data } = useQuery(GET_REACTIONS, {
    variables: { mediaId },
  });

 const [reactions, setReactions] = useState<any[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.reactions) {
      setReactions(data.reactions);
    }
  }, [data]);
 
  const toggleCommentForm = (reactionId: string) => {
    setActiveCommentId((prev) => (prev === reactionId ? null : reactionId));
  };
  
  if (reactionLoading) return <p>Loading reactions...</p>;
  if (reactionError) return <p>Error loading reactions.</p>;

  const handleCommentAdded = (reactionId: string, newComment: any) => {
    setReactions((prevReactions) =>
      prevReactions.map((reaction) =>
        reaction._id === reactionId
          ? {
              ...reaction,
              comments: [...(reaction.comments || []), newComment],
            }
          : reaction
      )
    );
  };

   return (
    <div className="reaction-list-container">
      <h3>Reactions</h3>
      {reactions.length === 0 ? (
        <p>No reactions yet.</p>
      ) : (
        reactions.map((r: any) => (
          <div key={r._id} className="reaction-card">
            <p>Title {r.title}</p>
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

            {/* Ensure comments is always an array */}
            {activeCommentId === r._id && (
              <>
                <CommentForm
                  reactionId={r._id}
                  onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment)}
                />
                <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
              </>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default ReactionList;