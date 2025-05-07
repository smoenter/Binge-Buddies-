// import { useQuery, useMutation } from '@apollo/client';
// import { useState } from 'react';
// import { GET_MY_REACTIONS, GET_FRIENDS_REACTIONS } from '../../utils/queries';
// import { REMOVE_REACTION } from '../../utils/mutations';
// import CommentForm from '../CommentForm';
// import CommentList from '../CommentList';
// import Heart from '../Heart'

// import './index.css';

// const ReactionList = () => {

//   const [activeTab, setActiveTab] = useState<'myPosts' | 'friendsPosts'>('myPosts');

//   const { loading: myLoading, error: myError, data: myData, refetch: refetchMy } = useQuery(GET_MY_REACTIONS);
//   const { loading: friendsLoading, error: friendsError, data: friendsData, refetch: refetchFriends } = useQuery(GET_FRIENDS_REACTIONS);


//   console.log('My data:', myData);
//   console.log('Friends data:', friendsData);

  
//   const [removeReaction] = useMutation(REMOVE_REACTION, {
//     onCompleted: () => {
//       refetchMy();
//       refetchFriends();
//     },
//     onError: (err) => console.error('Failed to delete reaction:', err),
//   });

//   const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

//   const toggleCommentForm = (reactionId: string) => {
//     setActiveCommentId((prev) => (prev === reactionId ? null : reactionId));
//   };

//   const handleDelete = async (reactionId: string) => {
//     await removeReaction({ variables: { reactionId } });
//   };

//   const handleCommentAdded = (reactionId: string, newComment: any, reactionsKey: 'reactions' | 'friendsReactions') => {
//     if (reactionsKey === 'reactions' && myData) {
//       myData.reactions = myData.reactions.map((reaction: any) =>
//         reaction._id === reactionId
//           ? { ...reaction, comments: [...(reaction.comments || []), newComment] }
//           : reaction
//       );
//     } else if (reactionsKey === 'friendsReactions' && friendsData) {
//       friendsData.friendsReactions = friendsData.friendsReactions.map((reaction: any) =>
//         reaction._id === reactionId
//           ? { ...reaction, comments: [...(reaction.comments || []), newComment] }
//           : reaction
//       );
//     }
//   };

//   if (myLoading || friendsLoading) return <p>Loading reactions...</p>;
//   if (myError || friendsError) return <p>Error loading reactions.</p>;

//   return (
//     <div className="reaction-list-container">
//       <div className="tab-buttons">
//         <button
//           className={`tab-button ${activeTab === 'myPosts' ? 'active' : ''}`}
//           onClick={() => setActiveTab('myPosts')}
//         >
//           Your Posts
//         </button>
//         <button
//           className={`tab-button ${activeTab === 'friendsPosts' ? 'active' : ''}`}
//           onClick={() => setActiveTab('friendsPosts')}
//         >
//           Your Feed
//         </button>
//       </div>

//       {activeTab === 'myPosts' && (
//         <>
//           <h3>Your Posts</h3>
//           {myData?.reactions?.length === 0 ? (
//             <p>No posts yet.</p>
//           ) : (
//             (myData?.reactions ?? []).map((r: any) => (
//               <div key={r._id} className="reaction-card">
//                 <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
//                   <button onClick={() => handleDelete(r._id)} title="Delete reaction">
//                     <img width="25" height="25" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete" />
//                   </button>
//                 </div>
//                 <p className="media-card-user-txt"><strong>{r.user?.username || 'Me'}</strong> </p>
//                 <p><strong>Title:</strong> {r.media?.title || 'Untitled'}</p>
//                 <p>{r.comment}</p>
//                 <p>Season {r.season}, Episode {r.episode}</p>
//                 <p>Rating: {r.rating}</p>
//                 <p className="reaction-date-txt">{new Date(parseInt(r.createdAt)).toLocaleString()}</p>

//                 <div className="icon-row">
//                   <Heart />
//                   <button onClick={() => toggleCommentForm(r._id)}>
//                     <img
//                       src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
//                       alt="comment icon"
//                       style={{ width: '24px', height: '24px' }}
//                     />
//                   </button>
//                 </div>

//                 {activeCommentId === r._id && (
//                   <>
//                     <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
//                     <CommentForm
//                       reactionId={r._id}
//                       onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment, 'reactions')}
//                     />
//                   </>
//                 )}
//               </div>
//             ))
//           )}
//         </>
//       )}

//       {activeTab === 'friendsPosts' && (
//         <>
//           <h3>Your feed</h3>
//           {friendsData?.friendsReactions?.length === 0 ? (
//             <p>No friends' posts yet.</p>
//           ) : (
//             (friendsData?.friendsReactions ?? []).map((r: any) => (
//               <div key={r._id} className="reaction-card">
//                 <p className="media-card-user-txt"><strong> {r.user?.username || 'Anonymous'}</strong></p>
//                 <p><strong>Title:</strong> {r.media?.title || 'Untitled'}</p>
//                 <p>{r.comment}</p>
//                 <p>Season {r.season}, Episode {r.episode}</p>
//                 <p>Rating: {r.rating}</p>
//                 <p className="reaction-date-txt">{new Date(parseInt(r.createdAt)).toLocaleString()}</p>

//                 <div className="icon-row">
//                   <Heart />
//                   <button onClick={() => toggleCommentForm(r._id)}>
//                     <img
//                       src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
//                       alt="comment icon"
//                       style={{ width: '24px', height: '24px' }}
//                     />
//                   </button>
//                 </div>

//                 {activeCommentId === r._id && (
//                   <>
//                     <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
//                     <CommentForm
//                       reactionId={r._id}
//                       onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment, 'friendsReactions')}
//                     />
//                   </>
//                 )}
//               </div>
//             ))
//           )}
//         </>
//       )}
//     </div>
//   );
// };


// export default ReactionList;

import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_MY_REACTIONS, GET_FRIENDS_REACTIONS } from '../../utils/queries';
import { REMOVE_REACTION } from '../../utils/mutations';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import Heart from '../Heart';
import './index.css';


const ReactionList = () => {
  const [activeTab, setActiveTab] = useState<'myPosts' | 'friendsPosts'>('myPosts');

  const [likes, setLikes] = useState(JSON.parse(localStorage.getItem('likes') || '[]'));
  // const { loading: reactionLoading, error: reactionError, data, refetch } = useQuery(GET_REACTIONS);
  const { loading: myLoading, error: myError, data: myData, refetch: refetchMy } = useQuery(GET_MY_REACTIONS);
  const { loading: friendsLoading, error: friendsError, data: friendsData, refetch: refetchFriends } = useQuery(GET_FRIENDS_REACTIONS);


  console.log('My data:', myData);
  console.log('Friends data:', friendsData);

  const handleLike = (reactionId: string) => {
    // Handle like functionality here
    console.log('Liked reaction with ID:', reactionId);

  }

  const likeCheck = (reactionId: string) => {
    return likes.includes(reactionId);
  };

  // Mutation

  const [removeReaction] = useMutation(REMOVE_REACTION, {
    onCompleted: () => {
      refetchMy();
      refetchFriends();
    },
    onError: (err) => console.error('Failed to delete reaction:', err),
  });

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  if (myLoading || friendsLoading) return <p>Loading reactions...</p>;
  if (myError || friendsError) return <p>Error loading reactions.</p>;

  return (
    <div className="reaction-list-container">
      <div className="tab-buttons">
        <button className={`tab-button ${activeTab === 'myPosts' ? 'active' : ''}`} onClick={() => setActiveTab('myPosts')}>
          Your Posts
        </button>
        <button className={`tab-button ${activeTab === 'friendsPosts' ? 'active' : ''}`} onClick={() => setActiveTab('friendsPosts')}>
          Your Feed
        </button>
      </div>

      {activeTab === 'myPosts' && (
        <>
          <h3 className="section-title">Your Posts</h3>
          {myData?.reactions?.length === 0 ? (
            <p className="empty-message">No posts yet.</p>
          ) : (

            (myData?.reactions ?? []).map((r: any) => (
              <div key={r._id} className="reaction-card">
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => handleDelete(r._id)} title="Delete reaction">
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/delete--v1.png" alt="delete" />
                  </button>
                </div>
                <p><strong>User:</strong> {r.user?.username || 'Me'}</p>
                <p><strong>Title:</strong> {r.media?.title || 'Untitled'}</p>
                <p>{r.comment}</p>
                <p>Season {r.season}, Episode {r.episode}</p>
                <p>Rating: {r.rating}</p>
                <p className="reaction-date-txt">{new Date(parseInt(r.createdAt)).toLocaleString()}</p>

                <div className="icon-row">
                  <Heart handleLike={handleLike} id={r._id} likeCheck={likeCheck} />
                  <button onClick={() => toggleCommentForm(r._id)}>
                    <img
                      src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
                      alt="comment icon"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </button>
                </div>

                {activeCommentId === r._id && (
                  <>
                    <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
                    <CommentForm
                      reactionId={r._id}
                      onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment, 'reactions')}
                    />
                  </>
                )}
              </div>
            ))

            <div className="posts-grid">
              {(myData?.reactions ?? []).map((r: any) => (
                <ReactionCard 
                  key={r._id}
                  reaction={r}
                  isOwnPost={true}
                  onDelete={() => removeReaction({ variables: { reactionId: r._id } })}
                  activeCommentId={activeCommentId}
                  setActiveCommentId={setActiveCommentId}
                  onCommentAdded={(newComment: any) => {
                    if (myData) {
                      myData.reactions = myData.reactions.map((reaction: any) =>
                        reaction._id === r._id
                          ? { ...reaction, comments: [...(reaction.comments || []), newComment] }
                          : reaction
                      );
                    }
                  }}
                />
              ))}
            </div>

          )}
        </>
      )}

      {activeTab === 'friendsPosts' && (
        <>
          <h3 className="section-title">Your Feed</h3>
          {friendsData?.friendsReactions?.length === 0 ? (
            <p className="empty-message">No friends' posts yet.</p>
          ) ; (
            (friendsData?.friendsReactions ?? []).map((r: any) => (
              <div key={r._id} className="reaction-card">
                <p><strong>User:</strong> {r.user?.username || 'Anonymous'}</p>
                <p><strong>Title:</strong> {r.media?.title || 'Untitled'}</p>
                <p>{r.comment}</p>
                <p>Season {r.season}, Episode {r.episode}</p>
                <p>Rating: {r.rating}</p>
                <p className="reaction-date-txt">{new Date(parseInt(r.createdAt)).toLocaleString()}</p>

                <div className="icon-row">
                  <Heart handleLike={handleLike} id={r._id} likeCheck={likeCheck} />
                  <button onClick={() => toggleCommentForm(r._id)}>
                    <img
                      src="https://img.icons8.com/parakeet-line/48/speech-bubble-with-dots.png"
                      alt="comment icon"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </button>
                </div>

                {activeCommentId === r._id && (
                  <>
                    <CommentList comments={Array.isArray(r.comments) ? r.comments : []} />
                    <CommentForm
                      reactionId={r._id}
                      onCommentAdded={(newComment) => handleCommentAdded(r._id, newComment, 'friendsReactions')}
                    />
                  </>
                )}
              </div>
            ))

            <div className="posts-grid">
              {(friendsData?.friendsReactions ?? []).map((r: any) => (
                <ReactionCard 
                  key={r._id}
                  reaction={r}
                  isOwnPost={false}
                  activeCommentId={activeCommentId}
                  setActiveCommentId={setActiveCommentId}
                  onCommentAdded={(newComment: any) => {
                    if (friendsData) {
                      friendsData.friendsReactions = friendsData.friendsReactions.map((reaction: any) =>
                        reaction._id === r._id
                          ? { ...reaction, comments: [...(reaction.comments || []), newComment] }
                          : reaction
                      );
                    }
                  }}
                />
              ))}
            </div>

          )}
        </>
      )}
    </div>
  );
};

const ReactionCard = ({ reaction, isOwnPost, onDelete, activeCommentId, setActiveCommentId, onCommentAdded }: any) => {
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

      {/* <div className="user-info">
          <span className="username">{reaction.user?.username || (isOwnPost ? 'You' : 'Anonymous')} </span>
          <span className="post-time">{new Date(parseInt(reaction.createdAt)).toLocaleString()}</span>
        </div> */}

      <div className="card-footer">
        <div className="engagement">
          <button className="like-btn">
            <Heart />
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

export default ReactionList;