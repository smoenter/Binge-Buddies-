// import MediaCard from "../components/MediaCard";
import Toggle from "../components/Toggle";
import SearchComponent from "../components/Search";
import InviteOptions from "../components/Invites/InviteOptions";
import { useState } from "react";

const YourWatchlist = () => {
  const [type, setType] = useState<"movie" | "series">("movie");

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
  };

  return (
    <div>
      {/* Header and Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>⭐ Your Watchlist</h1>
          <Toggle handleToggle={handleToggle} type={type} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SearchComponent onSearch={(query) => console.log(query)} />
          <InviteOptions />
        </div>
      </div>

      {/* Media Cards */}
      
    </div>
  );
};

export default YourWatchlist;
