
// Typescript interface representing a single comment
interface Comment {
  _id: string;
  createdAt: string;
  commentText: string;
  user: {
    username: string;
  };
}

//Props interface for the CommentList component
interface CommentListProps {
  comments?: Comment[];
}

//Functional component for rendeing a list of comments
const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
  console.log(comments);
  // If there are no comments, display a message and return early 
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      {/* Section header */}
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>

      {/* Container for comment cards */}
      <div className="flex-row my-4">
        {/* Loop through comments and render each one */}
        {comments.map((comment) => (
          <div key={comment._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              {/* Comment header with timestamp */}
              <h5 className="card-header">
                {comment.user.username} commented{' '}
                <span style={{ fontSize: '0.825rem' }}>
                  {/* Convert the timestamp to a readable date string */}
                  on {new Date(Number(comment.createdAt)).toLocaleString()}
                </span>
              </h5>

              {/* Comment text body */}
              <p className="card-body">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
