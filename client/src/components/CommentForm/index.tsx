import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

interface CommentFormProps {
  reactionId: string;
  onCommentAdded: (newComment: any) => void;
  onReactionAdded?: (newReaction:any) => void;
}

const CommentForm = ({ reactionId, onCommentAdded }: CommentFormProps) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  
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
        onCommentAdded(data.addComment); // ✅ pass new comment back to parent
      }

      // Reset form
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

  return (
    <div>
      <h4>What are your thoughts on this reaction?</h4>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="commentText"
            placeholder="Add your comment..."
            value={commentText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;