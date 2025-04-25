
import { useState } from "react";
import Toggle from "../components/Toggle/index";
import SearchComponent from "../components/Search/index";
import MediaCard from "../components/MediaCard";



const Browse = () => {
  const [type, setType] = useState<"movie" | "series">("movie");
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
   };

   const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?q=${query}&type=${type}`);
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search); // OMDb returns an array in `Search`
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className= "container-browse">
      <h1 className="mb-4">Browse</h1>
      <Toggle handleToggle={handleToggle} type={type}/>
      <SearchComponent onSearch={handleSearch} />
      {/* Add a search bar to filter results */}
      {/* Map over results to render MediaCards inside a carousel or grid */}
      <div className="d-flex flex-wrap gap-3 mt-4">
      {searchResults.map((item) => (
          <MediaCard
            key={item.imdbID}
            title={item.Title}
            type={item.Type}
            poster={item.Poster}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;