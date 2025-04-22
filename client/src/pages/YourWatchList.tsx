import MediaCard from "../components/MediaCard";
import Toggle from "../components/Toggle";

const YourWatchlist = () => {
  return (
    <div>
      <h1>⭐ Your Watchlist</h1>
      {/* Toggle between TV & Movies if needed */}

      <Toggle onToggle={(type: "movie" | "tv") => { /* handle toggle logic here */ }} />

      <div className="d-flex flex-wrap gap-3 mt-4">
        <MediaCard title="The Office" type="tv" saved />
        <MediaCard title="Interstellar" type="movie" saved />
        <MediaCard title="The Office" type="tv" saved />
        <MediaCard title="Interstellar" type="movie" saved />
        <MediaCard title="The Office" type="tv" saved />
        <MediaCard title="Interstellar" type="movie" saved />
      </div>
    </div>
  );
};

export default YourWatchlist;