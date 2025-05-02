import { useState, type FormEvent, type ChangeEvent } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import "./index.css"

const AddReactionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS, 'getThoughts', QUERY_ME, 'me'],
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addThought({
        variables: {
          input: {
            title,
            season,
            episode,
            thoughtText,
            thoughtAuthor: Auth.getProfile().data.username,
          },
        },
      });
      setTitle('');
      setSeason('');
      setEpisode('');
      setThoughtText('');
      setCharacterCount(0);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

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

          <textarea
            name="thoughtText"
            placeholder="Your comment..."
            value={thoughtText}
            onChange={handleTextChange}
            className="form-textarea"
            rows={3}
            required
          ></textarea>

          <div className="char-count">
            Character Count: {characterCount}/280
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