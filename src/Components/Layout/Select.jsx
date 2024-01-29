import React from 'react';

const Select = ({ id, options, onChange, value, style, disabled }) => {
  return (
    <select
      id={id}
      onChange={(e) =>
        onChange(options.find((option) => option.value === e.target.value))
      }
      value={value}
      style={style}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
