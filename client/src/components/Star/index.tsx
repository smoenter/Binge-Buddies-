import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ saved }: { saved?: boolean }) => {
  const [active, setActive] = useState(saved);

  return (
    <FaStar
      size={24}
      color={active ? "gold" : "gray"}
      onClick={() => setActive(!active)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Star;