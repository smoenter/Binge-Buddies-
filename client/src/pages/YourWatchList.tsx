import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Toggle from "../components/Toggle";
import SearchComponent from "../components/Search";
import InviteOptions from "../components/Invites/InviteOptions";
import MediaCard from "../components/MediaCard";

const YourWatchlist = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [type, setType] = useState<"movie" | "series">("movie");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refetch();
  }, []);

  const handleToggle = (newType: "movie" | "series") => {
    setType(newType);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query.toLowerCase());
  };

  if (loading) {
    return <h2>Loading your watchlist...</h2>;
  }

  const savedMedia = data?.me?.savedMedia || [];

  const filteredMedia = savedMedia.filter((media: any) => {
    const title = media.title?.toLowerCase() || "";
    const mediaType = media.type?.toLowerCase() || "";
    const matchesType = mediaType === type;
    const matchesSearch = title.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  return (
    <div>
      <div>
        <h1>⭐ Your Watchlist</h1>
        <InviteOptions />
        <Toggle handleToggle={handleToggle} type={type} />
        <SearchComponent onSearch={handleSearch} />
      </div>

      <div className="d-flex flex-wrap gap-3 mt-4">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((media: any) => (
            <MediaCard
              key={media._id}
              title={media.title}
              type={media.type}
              poster={media.posterUrl || ""}
              imdbID={media.imdbID || ""}
              saved={true}
              mediaId={media._id}
              refetch={refetch} 
              isWatchlistPage={true}
            />
          ))
        ) : (
          <p>No movies/shows saved yet!</p>
        )}
      </div>
    </div>
  );
};

export default YourWatchlist;





