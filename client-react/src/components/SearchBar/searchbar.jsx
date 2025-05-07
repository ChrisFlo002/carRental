// SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [make, setMake] = useState('Any Makes');
  const [model, setModel] = useState('Any Models');
  const [price, setPrice] = useState('All Prices');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ make, model, price });
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="dropdown-select">
          <select 
            value={make} 
            onChange={(e) => setMake(e.target.value)}
            className="select-input"
          >
            <option value="Any Makes">Any Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Dongfeng">Dongfeng</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div className="dropdown-select">
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="select-input"
          >
            <option value="Any Models">Any Fuel Type</option>
            <option value="Ev">EV</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Gasoline">Fuel Car</option>
          </select>
        </div>

        <div className="dropdown-select">
          <select 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            className="select-input"
          >
            <option value="All Prices">Price: All Prices</option>
            <option value="0-25">$0 - $25</option>
            <option value="26-50">$26 - $50</option>
            <option value="51-75">$51 - $75</option>
            <option value="76-100">$76 - $100</option>
            <option value="100+">$100+</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          <i className="search-icon"></i>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;