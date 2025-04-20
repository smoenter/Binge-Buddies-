import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Heart = () => {
  const [liked, setLiked] = useState(false);

  return (
    <FaHeart
      size={24}
      color={liked ? "red" : "gray"}
      onClick={() => setLiked(!liked)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Heart;