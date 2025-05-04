import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REACTIONS } from '../../utils/queries';
import { REMOVE_REACTION } from '../../utils/mutations';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

import './index.css';

const ReactionList = ({ mediaId }: { mediaId: string }) => {
// Fetch reactions data for the specific mediaId
  const { loading: reactionLoading, error: reactionError, data, refetch } = useQuery(GET_REACTIONS, {
    variables: { mediaId },
  });

  // Mutation hook to handle the removal of a reaction
  const [removeReaction] = useMutation(REMOVE_REACTION, {
    onCompleted: () => refetch(),
    onError: (err) => console.error('Failed to delete reaction:', err),
  });

  // State to store the list of reactions
  const [reactions, setReactions] = useState<any[]>([]);

  // State to track the currently active comment form
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

// useEffect hook to update reactions state when data is fetched from the server
    useEffect(() => {
    if (data?.reactions) {
      setReactions(data.reactions);
    }
  }, [data]);

  //Function to toggle the visibility of the comment form for a specific reaction
  const toggleCommentForm = (reactionId: string) => {
    // If the comment form for the same reaction is already active, close it; otherwise, opne it
    setActiveCommentId((prev) => (prev === reactionId ? null : reactionId));
  };

  // Function to handle reaction deletion
  const handleDelete = async (reactionId: string) => {
    await removeReaction({ variables: { reactionId } });
  };

  // If reaction are loading, show a loading message or an error message
  if (reactionLoading) return <p>Loading reactions...</p>;
  if (reactionError) return <p>Error loading reactions.</p>;

  // Function to handle adding a comment to a reaction
  const handleCommentAdded = (reactionId: string, newComment: any) => {
    // Update the reactions state to add the new comment to the relevant reaction
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

      {/* If there are no reactions, show a message */}
      {reactions.length === 0 ? (
        <p>No reactions yet.</p>
      ) : (
        // If reactions are available, map through them and display each one
        reactions.map((r: any) => (
          <div key={r._id} className="reaction-card">
            <p><strong>Title:</strong> {r.title || 'Untitled'}</p> {/* Display title or 'Untitled' if no title exists */}
            <p>{r.comment}</p> {/* Display the comment */}
            <p>Season {r.season}, Episode {r.episode}</p> {/* Display season and episode */}
            <p>Rating: {r.rating}</p> {/* Display the rating */}
            <small>{new Date(r.createdAt).toLocaleString()}</small> {/* Display the creation date of the reaction */}

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {/* Button to delete the reaction */}
              <button onClick={() => handleDelete(r._id)} title="Delete reaction">
                🗑️
              </button>
            </div>

            {/* Button to toggle the comment form for this reaction */}
            <button onClick={() => toggleCommentForm(r._id)}>
              <img
                src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
                alt="comment icon"
                style={{ width: '24px', height: '24px' }}
              />
            </button>

            {/* If this reaction is the active one, show the comment form and the list of comments */}
            {activeCommentId === r._id && (
              <>
                <CommentForm
                  reactionId={r._id} // Pass the reaction ID to the comment form
                  onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment)} // Callback to update the reactions state with the new comment
                />
                <CommentList comments={Array.isArray(r.comments) ? r.comments : []} /> {/* Pass the comments to the CommentList component */}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};


export default ReactionList;