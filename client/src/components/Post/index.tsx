// PostCard.tsx
// import React from "react";
import Heart from "../Heart";

const PostCard = ({ username, content }: { username: string; content: string }) => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <p className="card-text">{content}</p>
        <Heart />
      </div>
    </div>
  );
};

export default PostCard;
