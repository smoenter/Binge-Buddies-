
import { useState } from "react";
import Toggle from "../components/Toggle/index";
import SearchComponent from "../components/Search/index";
import MediaCard from "../components/MediaCard";
// import { useState } from "react";


const Browse = () => {
  const [type, setType] = useState<"movie" | "series">("movie");

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
   };

  return (
    <div>
      <h1 className="mb-4">Browse</h1>
      <Toggle handleToggle={handleToggle} type={type}/>
      <SearchComponent onSearch={(query) => console.log(query)} />
      {/* Add a search bar to filter results */}
      {/* Map over results to render MediaCards inside a carousel or grid */}
      <div className="d-flex flex-wrap gap-3 mt-4">
        {type === "movie" && (
        <>
          <MediaCard title="Inception" type="movie" />
          <MediaCard title="Interstellar" type="movie" />
          <MediaCard title="Inception" type="movie" />
          <MediaCard title="Interstellar" type="movie" />
          <MediaCard title="Inception" type="movie" />
          <MediaCard title="Interstellar" type="movie" />
          <MediaCard title="Inception" type="movie" />
          <MediaCard title="Interstellar" type="movie" />
          <MediaCard title="Inception" type="movie" />
        </>
        )}    
        {type === "series" && (
         <>
          <MediaCard title="Breaking Bad" type="series" />
          <MediaCard title="The Office" type="series" />
          <MediaCard title="Breaking Bad" type="series" />
          <MediaCard title="The Office" type="series" />
          <MediaCard title="Breaking Bad" type="series" />
          <MediaCard title="The Office" type="series" />
          <MediaCard title="Breaking Bad" type="series" />
          <MediaCard title="The Office" type="series" />
          <MediaCard title="Breaking Bad" type="series" />
        </>
        )}
      </div>
    </div>
  );
};

export default Browse;