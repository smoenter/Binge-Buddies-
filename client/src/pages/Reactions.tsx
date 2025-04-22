// src/pages/Reactions.tsx
import PostCard from "../components/Post/index";

const Reactions = () => {
  return (
    <div>
      <h1>💬 Reaction Dashboard</h1>
      {/* Friend search + add/unfriend UI here */}
      <div className="my-4">
        {/* PostCard could include heart + comment functionality */}
        <PostCard username="friend1" content="LOVED The Matrix!" />
        <PostCard username="you" content="Omg Succession finale 💀" />
      </div>
      <button className="gif-hover-button">
        <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/groups--v2.png" alt="groups--v2"/>
        {/* <img src="/friend-btn.png" alt="friend gif" /> */}
      </button>
    </div>
  );
};

export default Reactions;