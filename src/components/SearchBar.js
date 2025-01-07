// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handles input changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;  // Correct export

