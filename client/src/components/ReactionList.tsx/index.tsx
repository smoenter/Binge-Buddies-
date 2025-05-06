import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REACTIONS } from '../../utils/queries';
import { REMOVE_REACTION } from '../../utils/mutations';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Heart from '../Heart'

import './index.css';

const ReactionList = () => {

  const { loading: reactionLoading, error: reactionError, data, refetch } = useQuery(GET_REACTIONS);

  const [removeReaction] = useMutation(REMOVE_REACTION, {
    onCompleted: () => refetch(),
    onError: (err) => console.error('Failed to delete reaction:', err),
  });

 const [reactions, setReactions] = useState<any[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.reactions) {
      console.log('Fetch reactions', data.reactions)
      setReactions(data.reactions);
    }
  }, [data]);
 
  const toggleCommentForm = (reactionId: string) => {
    setActiveCommentId((prev) => (prev === reactionId ? null : reactionId));
  };

  const handleDelete = async (reactionId: string) => {
    await removeReaction({ variables: { reactionId } });
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
console.log(reactions)
   return (
    <div className="reaction-list-container">
      <h3>Reactions</h3>
      {reactions.length === 0 ? (
        <p>No reactions yet.</p>
      ) : (
        reactions.map((r: any) => (
          <div key={r._id} className="reaction-card">
             <p><strong>Title:</strong> {r.media.title || 'Untitled'}</p>
            <p>{r.comment}</p>
            <p>Season {r.season}, Episode {r.episode}</p>
            <p>Rating: {r.rating}</p>
            <small>{new Date(parseInt(r.createdAt)).toLocaleString()}</small>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => handleDelete(r._id)} title="Delete reaction">
                <img width="25" height="25" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete--v1"/>
              </button>
            </div>
            <Heart/>

            <button onClick={() => toggleCommentForm(r._id)}>
              <img
                src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
                alt="comment icon"
                style={{ width: '24px', height: '24px' }}
              />
            </button>

            {/* <Heart/> */}

            {/* Ensure comments is always an array */}
            {activeCommentId === r._id && (
              <>
              <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
                <CommentForm
                  reactionId={r._id}
                  onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment)}
                />
                {/* <CommentList comments={Array.isArray(r.comments) ? r.comments : []} /> */}
                
              </>
              
            )}
            

          </div>
        ))
      )}
    </div>
  );
};

export default ReactionList;