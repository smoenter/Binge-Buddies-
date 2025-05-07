
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Heart from '../Heart';
import './index.css';

const ReactionCard = ({ reaction, isOwnPost, onDelete, activeCommentId, setActiveCommentId, onCommentAdded, likeCheck, handleLike  }: any) => {
    const toggleCommentForm = (reactionId: string) => {
      setActiveCommentId((prev: string) => (prev === reactionId ? null : reactionId));
    };
  
    return (
      <div className="reaction-card">
        <div className="card-header">
          <div className="user-info">
            <span className="username">{reaction.user?.username || (isOwnPost ? 'You' : 'Anonymous')}</span>
            <span className="post-time">{new Date(parseInt(reaction.createdAt)).toLocaleString()}</span>
          </div>
          {isOwnPost && (
            <button className="delete-btn" onClick={onDelete} title="Delete reaction">
              <img width="20" height="20" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete" />
            </button>
          )}
        </div>
  
        <div className="card-content">
          <div className="media-info">
            <h4 className="media-title">{reaction.media?.title || 'Untitled'}</h4>
            {(reaction.season || reaction.episode) && (
              <span className="episode-info">
                S{reaction.season || '?'} E{reaction.episode || '?'}
              </span>
            )}
          </div>
  
          <div className="user-comment">
            <p>{reaction.comment}</p>
          </div>
  
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star ${i < reaction.rating ? 'filled' : ''}`}>★</span>
            ))}
          </div>
        </div>
  
        <div className="card-footer">
          <div className="engagement">
            <button className="like-btn">
            <Heart handleLike={handleLike} id={reaction._id} likeCheck={likeCheck} />
            </button>
            <button className="comment-btn" onClick={() => toggleCommentForm(reaction._id)}>
              <img src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png" alt="comment" />
              <span>{reaction.comments?.length || 0}</span>
            </button>
          </div>
        </div>
  
        {activeCommentId === reaction._id && (
          <div className="comments-section">
            <CommentList comments={Array.isArray(reaction.comments) ? reaction.comments : []} />
            <CommentForm
              reactionId={reaction._id}
              onCommentAdded={onCommentAdded}
            />
          </div>
        )}
      </div>
    );
  };

  export default ReactionCard