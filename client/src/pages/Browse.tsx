import { useState, useEffect } from "react";
import Toggle from "../components/Toggle";
import SearchComponent from "../components/Search";
import MediaSearch from "../components/MediaSearch";
import CategoryCarousel from "../components/Carousel/CategoryCarousel";
import { QUERY_MEDIA, QUERY_ME } from "../utils/queries";
import { useQuery, useLazyQuery } from "@apollo/client";

import "./css/Browse.css";

const Browse = () => {
  const [type, setType] = useState<"movie" | "series">("movie");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [lastQuery, setLastQuery] = useState("");
  const [fetchMedia, { loading, error }] = useLazyQuery(QUERY_MEDIA);
  const { data: userData, refetch: refetchUser } = useQuery(QUERY_ME);

  const savedList = userData?.me?.savedMedia || [];

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
  };

  const handleSearch = async (query: string) => {
    setLastQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const { data: searchData } = await fetchMedia({
        variables: { title: query, type, maxResults: 10 },
      });

      console.log("Search Data:", searchData);

      if (searchData?.media) {
        const merged = mergeSearchWithSaved(searchData.media, savedList);
        setSearchResults(merged);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (!lastQuery || !userData?.me) return;

    const updateAfterRefetch = async () => {
      try {
        const { data: searchData } = await fetchMedia({
          variables: { title: lastQuery, type, maxResults: 10 },
        });

        console.log("Refetch Search Data:", searchData);

        if (searchData?.media) {
          const updated = mergeSearchWithSaved(searchData.media, savedList);
          setSearchResults(updated);
        }
      } catch (err) {
        console.error("Failed to update search results:", err);
      }
    };

    updateAfterRefetch();
  }, [userData, lastQuery, type]);

  const mergeSearchWithSaved = (results: any[], saved: any[]) => {
    return results.map((item: any) => {
      const match = saved.find((s: any) => s.imdbID === item.imdbID);
      return {
        ...item,
        saved: Boolean(match),
        mediaId: match?._id || null,
      };
    });
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setLastQuery("");
  };

  return (
    <div className="container-browse">
      <h1>Browse</h1>
      <Toggle handleToggle={handleToggle} type={type} />
      <SearchComponent onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <button
          className="btn btn-secondary"
          onClick={handleClearSearch}
          aria-label="Clear search results and return to browse"
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/flat-round/64/back--v1.png"
            alt="Back to Browse"
          />
          Back to Browse
        </button>
      )}

      {searchResults.length === 0 ? (
        <CategoryCarousel savedList={savedList} type={type} />
      ) : (
        <div className="results-container">
          <MediaSearch results={searchResults} refetch={refetchUser} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error.message}</p>}
    </div>
  );
};

export default Browse;
