// import React from "react";
import MediaCard from "../MediaCard/index"; // Import the MediaCard component\
import "./index.css"; 


type Props = {
    results: any[];
  };

const MediaSearch = ({ results }: Props) => {

  return (
    <div>
      <h1>Search results</h1>

      {/* Render results if they exist */}
      {results.length > 0 ? (
        <div className="movie-results">
          {results.map((movie: any) => (
            <MediaCard
              key={movie.imdbID}  // Use unique identifier
              title={movie.Title}  // Pass title from search result
              type={movie.Type}    // Pass type (movie or series)
              poster={movie.Poster}  // Pass poster image URL
              imdbID={movie.imdbID}  // Pass imdbID for fetching details
              saved={false}  // You can manage saved state if needed
            />
          ))}
        </div>
      ) : (
        <p>No results found. Please try again.</p>
      )}
    </div>
  );
};

export default MediaSearch;