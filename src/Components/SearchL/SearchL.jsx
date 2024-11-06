import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchL.css';

const SearchL = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Call the onSearch function with the query
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group search-input-wrapper">
            <input 
              type="search" 
              className="form-control w-100" 
              placeholder="Please Search here..." 
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

SearchL.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchL;
