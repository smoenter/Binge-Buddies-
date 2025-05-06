import './index.css';


// Typescript interface representing a single comment
interface Comment {
  _id: string;
  createdAt: string;
  commentText: string;
  user?: {
    username?: string;
  };
}

// Props interface for the CommentList component
interface CommentListProps {
  comments?: Comment[];
}

// Functional component for rendering a list of comments
const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
  console.log(comments);

  // If there are no comments, display a message and return early
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

    return (
      <div className="comment-list">
      <div className="comment-list-header">
        <h3 className="comment-list-title">Comments</h3>
      </div>
      
      <div className="comment-items">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-user">
              <span className="comment-username">
                {comment.user?.username || "Anonymous"}
              </span>
              <span className="comment-time">
                {new Date(Number(comment.createdAt)).toLocaleString()}
              </span>
            </div>
            <div className="comment-text">
              {comment.commentText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;