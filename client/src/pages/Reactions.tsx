import ReactionList from "../components/ReactionList.tsx";
import CommentForm from "../components/CommentForm/index.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import './css/Reactions.css'


const Reactions = () => {
  const { imdbID } = useParams(); // Get imdbID from route
  const { data, loading, error } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;

  const savedMedia = data?.me?.savedMedia || [];
  const media = savedMedia.find((m: any) => m.imdbID === imdbID);

  return (
    <div>
      <h1 className="reactions-header-txt">Reactions</h1>
      <div className="my-4">
        <ReactionList />
       
        {/* Always show the reaction form */}
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