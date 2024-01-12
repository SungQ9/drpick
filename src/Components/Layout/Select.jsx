import React from 'react';

const Select = ({ id, options, onChange, value }) => {
  return (
    <select id={id} onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
