// import PostCard from "../components/Post/index";
// import FriendsButton from "../components/Friends/index"
// import { useParams } from "react-router-dom";
import AddReactionForm from "../components/AddReactionForm";
import ReactionList from "../components/ReactionList.tsx";
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

  if (!media) {
    return <p>Media not found. Please save it to your watchlist first.</p>;
  }

  return (
    <div>
      <h1>💬 Reaction Dashboard</h1>
      <div className="my-4">
        <AddReactionForm mediaId={media._id} />
        <ReactionList mediaId={media._id} />
      </div>
    </div>
  );
};

export default Reactions;