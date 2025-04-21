import "./index.css";
import { useState } from "react";

const Toggle = ({ onToggle }: { onToggle: (type: "movie" | "tv") => void }) => {
  const [type, setType] = useState<"movie" | "tv">("movie");

  const handleToggle = (newType: "movie" | "tv") => {
    setType(newType);
    onToggle(newType);
  };

  return (
    <div className="btn-group" role="group">
      <button
        className={`custom-toggle ${type === "movie" ? "selected" : ""}`}
        onClick={() => handleToggle("movie")}
      >
        <img
          src="https://img.icons8.com/ios/50/film-reel--v1.png"
          alt="Movies"
          width={24}
          height={24}
        />
      </button>
      <button
        className={`custom-toggle ${type === "tv" ? "selected" : ""}`}
        onClick={() => handleToggle("tv")}
      >
        <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/retro-tv.png" alt="retro-tv"/>
      </button>
    </div>
  );
};

export default Toggle;