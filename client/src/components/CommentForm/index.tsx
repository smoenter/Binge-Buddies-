import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import './index.css'


// Props the CommentForm component receives
interface CommentFormProps {
  reactionId: string;
  onCommentAdded: (newComment: any) => void;
  onReactionAdded?: (newReaction: any) => void;
}

// Functional component
const CommentForm = ({ reactionId, onCommentAdded }: CommentFormProps) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // GraphQL mutation hook for adding a comment
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // Handle form submission 
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default page reload on form submission

    try {
      // Execute the addComment mutation with the input variables
      const { data } = await addComment({
        variables: {
          reactionId,
          commentText,
        },
      });

      // If the mutation was successful, pass the new comment back up to the parent
      if (data && data.addComment) {
        onCommentAdded(data.addComment); // ✅ pass new comment back to parent
      }

      // Reset form
      setCommentText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle live typing in the textarea
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
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
        <textarea
          name="commentText"
          placeholder="What are your thoughts?"
          value={commentText}
          className="comment-input"
          onChange={handleChange}
          required
        ></textarea>

        {/* Submit button */}
        <div className="col-12 col-lg-3">
          <button className="btn btn-primary " type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommentForm;