// import PostCard from "../components/Post/index";
// import { useParams } from "react-router-dom";
import AddReactionForm from "../components/AddReactionForm";
import ReactionList from "../components/ReactionList.tsx";
import CommentForm from "../components/CommentForm/index.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";


const Reactions = () => {
  const { imdbID } = useParams(); // Get imdbID from route
  const { data, loading, error } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  const savedMedia = data?.me?.savedMedia || [];
  const media = savedMedia.find((m: any) => m.imdbID === imdbID);

  // if (!media) {
  //   return <p>Media not found. Please save it to your watchlist first.</p>;
  // }

  return (
    <div>
      <h1>💬 Reaction Dashboard</h1>
      <div className="my-4">
        {media ? (
          <>
            <p>Reacting to: {media.title}</p>
            <ReactionList mediaId={media._id} />
          </>
        ) : (
          <p>⚠️ Media not found in watchlist — you can still leave a reaction.</p>
        )
        }
  
        {/* Always show the reaction form */}
        <AddReactionForm mediaId={media ? media._id : imdbID} />
  
        {media?.reactions?.map((reaction: any) => (
          <CommentForm
            key={reaction._id}
            reactionId={reaction._id}
            onCommentAdded={() => {
              /* Add your logic here */
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Reactions;