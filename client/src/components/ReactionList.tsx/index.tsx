import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_MY_REACTIONS, GET_FRIENDS_REACTIONS } from '../../utils/queries';
import { REMOVE_REACTION } from '../../utils/mutations';
import ReactionCard from './ReactionCard';
import './index.css';


const ReactionList = () => {
  const [activeTab, setActiveTab] = useState<'myPosts' | 'friendsPosts'>('myPosts');

  const [likes] = useState(JSON.parse(localStorage.getItem('likes') || '[]'));
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

          <div className="posts-grid">
            {(myData?.reactions ?? []).map((r: any) => (
              <ReactionCard
                key={r._id}
                reaction={r}
                isOwnPost={true}
                onDelete={() => removeReaction({ variables: { reactionId: r._id } })}
                activeCommentId={activeCommentId}
                setActiveCommentId={setActiveCommentId}
                handleLike={handleLike}
                likeCheck={likeCheck}
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
        </>
      )}

      {activeTab === 'friendsPosts' && (
        <>
          <h3 className="section-title">Your Feed</h3>
          < div className="posts-grid">
            {(friendsData?.friendsReactions ?? []).map((r: any) => (
              <ReactionCard
                key={r._id}
                reaction={r}
                isOwnPost={false}
                activeCommentId={activeCommentId}
                likeCheck={likeCheck}
                handleLike={handleLike}
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
          </div >
        </>
      )}
    </div >
  )};



export default ReactionList;