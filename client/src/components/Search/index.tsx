import React, { useState } from "react";
import './index.css'; // Import your CSS file for styling

const SearchComponent = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
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