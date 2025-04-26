import React, { useState } from "react";
import './index.css'; // Import your CSS file for styling

const SearchComponent = ({ onSearch }: { onSearch: (data: any) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the OMDB API URL
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const baseUrl = import.meta.env.VITE_OMDB_BASE_URL;

    const url = `${baseUrl}/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

    console.log("API Key:", apiKey);
    console.log("Base URL:", baseUrl);
    console.log("Full URL:", `${baseUrl}/?apikey=${apiKey}&s=${query}`);

    try {
      // Fetch data from OMDB API
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        // Pass the fetched data to the parent component
        onSearch(data.Search); // Assuming 'Search' is the key containing the movie results
      } else {
        console.error("Error fetching data:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3">
      <div className= "search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search titles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-search" type="submit">
      <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/search--v1.png" alt="search--v1"/>
      </button>
      </div>
    </form>
  );
};

export default SearchComponent;