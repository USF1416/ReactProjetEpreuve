import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button type="submit" style={{ padding: "8px 16px", marginLeft: "10px" }}>
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
