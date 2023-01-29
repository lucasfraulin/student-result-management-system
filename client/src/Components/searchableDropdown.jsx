import React, { useState } from 'react';

const SearchableDropdown = ({ options, onOptionSelected }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const filteredOptions = options
    .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
    setShowOptions(true);
  };

  const handleOptionSelected = option => {
    setSearchTerm(option);
    setShowOptions(false);
    setSelectedOption(option);
    onOptionSelected(option);
  };

  return (
    <div className="searchable-dropdown">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {showOptions && (
        <ul>
          {filteredOptions.map(option => (
            <li
              key={option}
              onClick={() => handleOptionSelected(option)}
              className={selectedOption === option ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
