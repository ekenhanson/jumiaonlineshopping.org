
import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group search-input-wrapper">
            <input 
              type="search" 
              className="form-control w-100" 
              placeholder="Search..." 
              value={query} 
              onChange={handleInputChange} 
            />
            <button type="submit" className="search-icon-btn">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


Search.propTypes = {
    onSearch: PropTypes.func.isRequired, // Define prop types
};
export default Search;
