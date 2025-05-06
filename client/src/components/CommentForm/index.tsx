import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import './index.css'

interface CommentFormProps {
  reactionId: string;
  onCommentAdded: (newComment: any) => void;
  onReactionAdded?: (newReaction: any) => void;
}

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

const CommentForm = ({ reactionId, onCommentAdded }: CommentFormProps) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Love');

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          reactionId,
          commentText,
        },
      });

      if (data && data.addComment) {
        onCommentAdded(data.addComment);
      }

      setCommentText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (commentText.length + emoji.length <= 280) {
      setCommentText(commentText + emoji);
      setCharacterCount(commentText.length + emoji.length);
    }
  };

  return (
    <div className="comment-form">
      <div className="comment-form-header">
        <h4 className="comment-form-title">Add a comment</h4>
        <span className={`comment-count ${characterCount === 280 || error ? 'error' : ''}`}>
          {characterCount}/280
        </span>
      </div>

      <form className="comment-form-body" onSubmit={handleFormSubmit}>
        {/* <div className="emoji-picker-container">
          <button
            type="button"
            className="emoji-toggle"
            onClick={() => setShowPicker(!showPicker)}
          >
            <img width="30" height="30" src="https://img.icons8.com/color/48/sticker-square.png" alt="sticker-square"/>
          </button>
          {showPicker && (
            <div className="emoji-picker">
              <div className="emoji-categories">
                {Object.keys(emojiCategories).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`emoji-category-button ${
                      activeCategory === category ? 'active' : ''
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
        </div> */}

        <textarea
          name="commentText"
          placeholder="What are your thoughts?"
          value={commentText}
          className="comment-input"
          onChange={handleChange}
          required
        ></textarea>

<div className="emoji-picker-container">
          <button
            type="button"
            className="emoji-toggle"
            onClick={() => setShowPicker(!showPicker)}
          >
            <img width="30" height="30" src="https://img.icons8.com/color/48/sticker-square.png" alt="sticker-square"/>
          </button>
          {showPicker && (
            <div className="emoji-picker">
              <div className="emoji-categories">
                {Object.keys(emojiCategories).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`emoji-category-button ${
                      activeCategory === category ? 'active' : ''
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

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;


{/* <button
type="button"
className="emoji-toggle-btn"
onClick={() => setShowEmojis(prev => !prev)}
aria-label="Toggle emoji picker"
>
<img width="30" height="30" src="https://img.icons8.com/color/48/sticker-square.png" alt="sticker-square"/>
</button> */}