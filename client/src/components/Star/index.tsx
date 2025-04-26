import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ saved }: { saved?: boolean }) => {
  const [active, setActive] = useState(saved);

  return (
    <div onClick={() => setActive(!active)} style={{ display: "inline-block", cursor: "pointer" }}>
      <FaStar
        size={24}
        color={active ? "gold" : "gray"}
      />
    </div>
  );
};

export default Star;
