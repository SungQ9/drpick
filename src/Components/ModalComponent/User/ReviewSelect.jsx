import React, { useState } from 'react';

import star from '../../../img/star-icon.png';

const ReviewSelect = ({ id, options, onChange, value, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div style={{ ...style, position: 'relative' }}>
      <div id={id} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : 'Select a rating'}
        <span style={{ marginLeft: '10px' }}>&#9660;</span>{' '}
        {/* Dropdown Arrow */}
      </div>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            zIndex: 1000,
            listStyleType: 'none',
            padding: 0,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
              <img
                src={star}
                alt='Star'
                style={{ marginRight: '10px', width: '20px' }}
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ReviewSelect;
