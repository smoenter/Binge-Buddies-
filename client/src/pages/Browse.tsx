
import { useState } from "react";
import Toggle from "../components/Toggle/index";
import SearchComponent from "../components/Search/index";
// import MediaCard from "../components/MediaCard";
import MediaSearch from "../components/MediaSearch"; 
import { QUERY_MEDIA } from "../utils/queries"; 
import { useMutation } from "@apollo/client"; 


const Browse = () => {

  const [fetchMedia, { error: mediaError } ] = useMutation(QUERY_MEDIA);

  if (mediaError) {
    console.log(JSON.stringify(mediaError));
  }

  const [type, setType] = useState<"movie" | "series">("movie");
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
   };

   const handleSearch = async (query: string) => {
    try {
      const { data } = await fetchMedia({
        variables: { type, title: query },
      });
      console.log(data);

      if (data.media) {
        setSearchResults(data.media); // OMDb returns an array in `Search`
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
      <MediaSearch results={searchResults} />
      </div>
    </div>
  );
};

export default Browse;