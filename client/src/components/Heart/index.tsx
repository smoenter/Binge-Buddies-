import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface HeartProps {
  handleLike: (id:string) => void;
  likeCheck: (id:string) => boolean;
  id:string;
}

const Heart = ({ handleLike, id, likeCheck}: HeartProps) => {
  const [liked, setLiked] = useState<boolean>(() => likeCheck(id));

  const handleClick = () => {
    handleLike(id);
    //setLiked(!liked);
    setLiked((prevLiked) => !prevLiked);
    // Update the local storage
    const likes = JSON.parse(localStorage.getItem("likes") || "[]");
    if (liked) {
      // Remove the like
      const updatedLikes = likes.filter((likeId: string) => likeId !== id);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));
    }
    else {
      // Add the like
      likes.push(id);
      localStorage.setItem("likes", JSON.stringify(likes));
    }
  };

  const count = liked ? 1 : 0;

  return (
    <div
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        userSelect: "none"
      }}
    >
      <FaHeart size={24} color={liked ? "red" : "gray"} />
      <span style={{ fontSize: "1rem", color: liked ? "red" : "gray" }}>{count}</span>
    </div>
  );
};

export default Heart;