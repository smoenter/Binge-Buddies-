import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import { QUERY_ME, GET_REACTIONS } from '../../utils/queries';

import "./index.css"
// EMOJI CATEGORIES
const emojiCategories: { [key: string]: string[] } = {
  Love: ['❤️', '🥰', '😍', '🤩', '💖'],
  Funny: ['😂', '🤣', '😹', '😆', '😜'],
  Emotional: ['😭', '😢', '🥺', '💔', '😿'],
  Shocked: ['😲', '😱', '😮', '🤯', '😵‍💫'],
  Impressed: ['👏', '🙌', '👍', '🔥', '💯'],
  Confused: ['🤔', '😕', '😵‍💫', '🫤', '🫣'],
  Angry: ['😡', '🤬', '😤', '👿', '💢'],
  Bored: ['🥱', '😴', '😪', '🙄', '😐'],
  Movie: ['🍿', '🎥', '🎬', '🎞️', '📽️'],
};

interface AddReactionFormProps {
  mediaId: string; // required to associate the reaction
}


//Form Fields
const AddReactionForm = ({ mediaId }: AddReactionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(1);
  const [characterCount, setCharacterCount] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Love');
  const [message, setMessage] = useState('');


  //Mutation hook for adding a reaction
  const [addReaction, { error }] = useMutation(ADD_REACTION, {
    refetchQueries: [
      { query: GET_REACTIONS },
      { query: QUERY_ME }
    ]
  });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  //Form submission handler
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Perform the mutation
      await addReaction({
        variables: {
          mediaId,// this is actually the imdbID
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
      setMessage('Reaction added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  //Character count and comment handler
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setComment(value);
      setCharacterCount(value.length);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (comment.length + emoji.length <= 280) {
      setComment(comment + emoji);
      setCharacterCount(comment.length + emoji.length);
    }
  };


  return (
    <div className="add-reaction-container">
      <AnimatePresence>
        {message && (
          <motion.div
            className="notification"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="notification-content">
              <svg className="notification-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(true)}
        className="add-reaction-button"
        title="Add Reaction"
      >
        <img width="24" height="24" src="https://img.icons8.com/ios/50/plus-math--v1.png" alt="add" />
      </button>
      {isOpen && (
        <div className="reaction-popup-overlay">
          {/* Render the form when isOpen is true */}
          <form onSubmit={handleFormSubmit} className="reaction-form">
            <h3 className="form-title">Add a Reaction</h3>
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
            <div className="char-count">Character Count: {characterCount}/280</div>
            <textarea
              name="comment"
              placeholder="Your reaction..."
              value={comment}
              onChange={handleTextChange}
              className="form-textarea"
              rows={3}
              required
            ></textarea>

            <div className="emoji-picker-container">
              <button
                type="button"
                className="emoji-toggle"
                onClick={() => setShowPicker(!showPicker)}
              >
                <img width="30" height="30" src="https://img.icons8.com/color/48/sticker-square.png" alt="sticker-square" />
              </button>
              {showPicker && (
                <div className="emoji-picker">
                  <div className="emoji-categories">
                    {Object.keys(emojiCategories).map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`emoji-category-button ${activeCategory === category ? 'active' : ''
                          }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="emoji-list">
                    {emojiCategories[activeCategory].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="emoji-button"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
        </div>
      )}
    </div>
  );
};


export default AddReactionForm;

