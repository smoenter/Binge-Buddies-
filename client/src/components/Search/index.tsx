import React, { useState } from "react";
import './index.css'; 

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
    setError(null); // Reset error state

  //   try {
  //     // const apiKey = import.meta.env.VITE_OMDB_API_KEY; 
  //     const apiKey = '43654c5b' // Ensure your API key is set in .env

  //     const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`);
  //     const data = await response.json();

  //     if (data.Response === "True") {
  //       onSearch(data.Search); // Pass results to parent component
  //     } else {
  //       setError(data.Error || "No results found.");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     setError("Failed to fetch results. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  try {
    await onSearch(query); // :white_check_mark: must return a promise
  } catch (err: any) {
    setError("Search failed. Try again.");
  } finally {
    setLoading(false);
  }
  };
  

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3">
      <div className="search-wrapper">
        <label htmlFor="search-input" className="visually-hidden">Search titles:</label>
        <input
          id="search-input"
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
