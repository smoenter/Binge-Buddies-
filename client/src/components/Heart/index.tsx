import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Heart = () => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked((prevLiked) => !prevLiked);
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