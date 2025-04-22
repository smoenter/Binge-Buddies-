
import { useState } from "react";
import Toggle from "../components/Toggle/index";
// import SearchComponent from "../components/SearchComponent";
import MediaCard from "../components/MediaCard";

const Browse = () => {
  const [selectedType, setSelectedType] = useState<"movie" | "tv">("movie");

  type MediaType = "movie" | "tv";

  const mediaItems: { title: string; type: MediaType }[] = [
    { title: "Breaking Bad", type: "tv" },
    { title: "Inception", type: "movie" },
    { title: "The Office", type: "tv" },
    { title: "Interstellar", type: "movie" },
    { title: "Friends", type: "tv" },
    { title: "The Matrix", type: "movie" },
  ];

  const filteredItems = mediaItems.filter((item) => item.type === selectedType);

  return (
    <div>
      <h1 className="mb-4">Browse</h1>
      <Toggle onToggle={(type: "movie" | "tv") => setSelectedType(type)} />

      <div className="d-flex flex-wrap gap-3 mt-4">
        {filteredItems.map((item, index) => (
          <MediaCard key={index} title={item.title} type={item.type} />
        ))}
      </div>
    </div>
  );
};

export default Browse;