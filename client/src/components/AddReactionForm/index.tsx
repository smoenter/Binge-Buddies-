import { useState, type FormEvent, type ChangeEvent } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import { QUERY_ME, GET_REACTIONS } from '../../utils/queries';
// import Auth from '../../utils/auth';

import "./index.css"


interface AddReactionFormProps {
  mediaId: string; // required to associate the reaction
}

const AddReactionForm = ({ mediaId }: AddReactionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  // const [thoughtText, setThoughtText] = useState('');
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  // const [addThought, { error }] = useMutation(ADD_THOUGHT, {
  //   refetchQueries: [QUERY_THOUGHTS, 'getThoughts', QUERY_ME, 'me'],
  // });

  const [addReaction, { error }] = useMutation(ADD_REACTION, {
    refetchQueries: [
      { query: GET_REACTIONS, variables: { mediaId } },
      { query: QUERY_ME }
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    
  if (!mediaId) {
    console.error("No mediaId provided");
    return;
  }

    try {
      await addReaction({
        variables: {
          mediaId,
          comment,
          season: season ? parseInt(season) : undefined,
          episode: episode ? parseInt(episode) : undefined,
          rating
        }
      });

      // Reset form fields
      setSeason('');
      setEpisode('');
      setComment('');
      setCharacterCount(0);
      setRating(5);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setComment(value);
      setCharacterCount(value.length);
    }
  };

  // const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(event.target.value, 10);
  //   setRating(isNaN(value) ? 1 : value); // Default to 1 if invalid
  // };

  return (
    <div className="add-reaction-container">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="add-reaction-button"
          title="Add Reaction"
        >
          <img width="24" height="24" src="https://img.icons8.com/ios/50/plus-math--v1.png" alt="add" />
        </button>
      ) : (
        <form onSubmit={handleFormSubmit} className="reaction-form">
          <h3 className="form-title">Add a Reaction</h3>

          <input
            type="text"
            placeholder="Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />

          <div className="form-row">
            <input
              type="text"
              placeholder="Season (optional)"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="form-input half-width"
            />
            <input
              type="text"
              placeholder="Episode (optional)"
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
              className="form-input half-width"
            />
          </div>

          <div className="char-count">
            Character Count: {characterCount}/280
          </div>

          <textarea
            name="comment"
            placeholder="Your reaction..."
            value={comment}
            onChange={handleTextChange}
            className="form-textarea"
            rows={3}
            required
          ></textarea>

        {/* Emoji picker */}
        <div className="emoji-picker" style={{ margin: '0.5rem 0' }}>
            <strong>Add an emoji:</strong>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 😀")}>😀</span>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 😍")}>😍</span>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 🤔")}>🤔</span>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 😢")}>😢</span>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 😠")}>😠</span>
            <span className="emoji-button" onClick={() => setComment(prev => prev + " 😲")}>😲</span>
          </div>

           {/* Star Rating */}
           <div className="form-row">
            <label>Rating:</label>
            <div style={{ display: 'flex', gap: '0.25rem', fontSize: '1.75rem', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? '#ffc107' : '#e4e5e9' }}
                  role="button"
                  aria-label={`Set rating to ${star}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
         

          {error && <div className="error-message">{error.message}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddReactionForm;

// try {
//   await addThought({
//     variables: {
//       input: {
//         title,
//         season,
//         episode,
//         thoughtText,
//         thoughtAuthor: Auth.getProfile().data.username,
//       },
//     },
//   });
//   setTitle('');
//   setComment('')
//   setSeason('');
//   setEpisode('');
//   setThoughtText('');
//   setCharacterCount(0);
//   setIsOpen(false);
// } catch (err) {
//   console.error(err);
// }