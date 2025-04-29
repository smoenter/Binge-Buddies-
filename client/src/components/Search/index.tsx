import React, { useState } from "react";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { QUERY_MEDIA } from "../../utils/queries";
import './index.css'; 

// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql", // Your GraphQL endpoint
//   cache: new InMemoryCache(),
// });


const SearchComponent = ({ onSearch }: { onSearch: (data: any) => void }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    setLoading(true);
    //reset error state
    setError(null); 

    try {
      await onSearch(query); // ✅ must return a promise
    } catch (err: any) {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
    

  // try {
  //   const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  //   const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`);
  //   const data = await response.json();

  //   if (data.Response === "True") {
  //     onSearch(data.Search); 
  //   } else {
  //     setError(data.Error || "No results found.");
  //   }
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   setError("Failed to fetch results. Please try again.");
  // } finally {
  //   setLoading(false);
  // }
};

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3">
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search titles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-search" type="submit" disabled={loading}>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
            alt="search"
          />
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SearchComponent;