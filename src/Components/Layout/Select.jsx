import React from 'react';

const Select = ({
  id,
  className,
  options,
  onChange,
  value,
  style,
  disabled,
}) => {
  return (
    <select
      id={id}
      className={className}
      onChange={onChange}
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
