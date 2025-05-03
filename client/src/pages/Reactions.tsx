// import PostCard from "../components/Post/index";
// import FriendsButton from "../components/Friends/index"
// import { useParams } from "react-router-dom";
import AddReactionForm from "../components/AddReactionForm";
import ReactionList from "../components/ReactionList.tsx";


const Reactions = () => {
  const mediaId = "exampleMediaId"; // Replace with actual mediaId logic

  return (
    <div>
      {/* <FriendsButton/> */}
      <h1>💬 Reaction Dashboard</h1>
      {/* Friend search + add/unfriend UI here */}
      <div className="my-4">
      <AddReactionForm mediaId={mediaId} />
      <ReactionList mediaId={mediaId}/>

        {/* PostCard could include heart + comment functionality */}
        {/* <PostCard username="friend1" content="LOVED The Matrix!" /> */}
        {/* <PostCard username="you" content="Omg Succession finale 💀" /> */}
      </div>
   
      {/* <FriendsButton/> */}
   
    </div>
  );
};

export default Reactions;