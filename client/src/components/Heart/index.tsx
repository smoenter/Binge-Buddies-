import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Heart = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div onClick={() => setLiked(!liked)} style={{ display: "inline-block", cursor: "pointer" }}>
      <FaHeart
        size={24}
        color={liked ? "red" : "gray"}
      />
    </div>
  );
};

export default Heart;