import "./index.css";
// import { useState } from "react";

interface toggleProps{
  handleToggle: (newType: "movie" | "series") => void,
  type: "movie" | "series"
}

const Toggle = ({handleToggle, type}:toggleProps) => {
  // const [type, setType] = useState<"movie" | "series">("movie");

  // const handleToggle = (newType: "movie" | "series") => {
  //   setType(newType);
  //   onToggle(newType);
  // };

  return (
    <div className="btn-group" role="group">
      <button
        className={`custom-toggle ${type === "movie" ? "selected" : ""}`}
        onClick={() => handleToggle("movie")}
      >
        <img
          src="https://img.icons8.com/ios/50/film-reel--v1.png"
          alt="Movies"
          width={25}
          height={25}
        />
      </button>
      <button
        className={`custom-toggle ${type === "series" ? "selected" : ""}`}
        onClick={() => handleToggle("series")}
      >
        <img 
          width={25}
          height={25}
          src="https://img.icons8.com/ios-filled/50/retro-tv.png"
          alt="retro-tv"/>
      </button>
    </div>
  );
};

export default Toggle;