// import PostCard from "../components/Post/index";
// import FriendsButton from "../components/Friends/index"
import ThoughtForm from "../components/ThoughtForm";
// import CommentForm from "../components/CommentForm";

const Reactions = () => {
  return (
    <div>
      {/* <FriendsButton/> */}
      <h1>💬 Reaction Dashboard</h1>
      {/* Friend search + add/unfriend UI here */}
      <div className="my-4">

      <ThoughtForm/>

        {/* PostCard could include heart + comment functionality */}
        {/* <PostCard username="friend1" content="LOVED The Matrix!" /> */}
        {/* <PostCard username="you" content="Omg Succession finale 💀" /> */}
      </div>
      {/* <CommentForm/> */}
      {/* <FriendsButton/> */}
   
    </div>
  );
};

export default Reactions;