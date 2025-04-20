// src/pages/Home.tsx
import Toggle from "../components/Toggle/index";
// import SearchComponent from "../components/SearchComponent";
// import MediaCard from "../components/MediaCard";

const Browse = () => {
  return (
    <div>
      <h1 className="mb-4">Welcome to WatchWithMe 🎬</h1>
      <Toggle />
      {/* <SearchComponent /> */}
      {/* Map over results to render MediaCards inside a carousel or grid */}
      <div className="d-flex flex-wrap gap-3 mt-4">
        {/* Example static card */}
        {/* <MediaCard title="Breaking Bad" type="tv" /> */}
        {/* <MediaCard title="Inception" type="movie" /> */}
        {/* <MediaCard title="The Office" type="tv" /> */}
        {/* <MediaCard title="Interstellar" type="movie" /> */}
      </div>
    </div>
  );
};

export default Browse;