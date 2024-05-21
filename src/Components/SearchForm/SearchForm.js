import "../SearchForm/SearchForm.css";
import { useState } from "react";
const SearchForm = ({ search, setSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchInput("");
  };
  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <label htmlFor="search">Search Toys</label>
      <input
        id="search"
        className="searchInput"
        type="text"
        placeholder="Search toys"
        value={searchInput}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
