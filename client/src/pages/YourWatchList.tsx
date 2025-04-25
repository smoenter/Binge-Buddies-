import MediaCard from "../components/MediaCard";
import Toggle from "../components/Toggle";
import SearchComponent from "../components/Search";
import { useState } from "react";

const YourWatchlist = () => {
  const [type, setType] = useState<"movie" | "series">("movie");

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
  };

  return (
    <div>
      <h1>⭐ Your Watchlist</h1>
      {/* Toggle between series & Movies if needed */}

      <Toggle handleToggle={handleToggle} type={type} />

      <SearchComponent onSearch={(query) => console.log(query)} />
      

      <div className="d-flex flex-wrap gap-3 mt-4">
  {type === "movie" && (
    <>
      <MediaCard title="Interstellar" type="movie" saved />
      <MediaCard title="Interstellar" type="movie" saved />
      <MediaCard title="Interstellar" type="movie" saved />
      <MediaCard title="Interstellar" type="movie" saved />
      <MediaCard title="Interstellar" type="movie" saved />
      <MediaCard title="Interstellar" type="movie" saved />
    </>
  )}

  {type === "series" && (
    <>
      <MediaCard title="The Office" type="series" saved />
      <MediaCard title="The Office" type="series" saved />
      <MediaCard title="The Office" type="series" saved />
      <MediaCard title="The Office" type="series" saved />
      <MediaCard title="The Office" type="series" saved />
      <MediaCard title="The Office" type="series" saved />
    </>
  )}
</div>
    </div>
  );
};

export default YourWatchlist;