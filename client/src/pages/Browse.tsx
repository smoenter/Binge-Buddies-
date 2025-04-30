import { useState } from "react";
import Toggle from "../components/Toggle";
import SearchComponent from "../components/Search";
import MediaSearch from "../components/MediaSearch";
import { QUERY_MEDIA } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

const Browse = () => {
  const [type, setType] = useState<"movie" | "series">("movie");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [fetchMedia, { loading, error }] = useLazyQuery(QUERY_MEDIA);

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
  };

  const handleSearch = async (query: string) => {
    try {
      const { data } = await fetchMedia({ variables: { title: query, type } });
      if (data?.media) {
        setSearchResults(data.media);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  };

  return (
    <div className="container-browse">
      <h1 className="mb-4">Browse</h1>
      <Toggle handleToggle={handleToggle} type={type} />
      <SearchComponent onSearch={handleSearch} />
      <div className="d-flex flex-wrap gap-3 mt-4">
        <MediaSearch results={searchResults} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error.message}</p>}
    </div>
  );
};

export default Browse;
