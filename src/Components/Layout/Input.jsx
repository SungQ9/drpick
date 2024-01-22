import React from 'react';

const Input = ({
  id,
  label,
  type,
  placeholder,
  onChange,
  value,
  style,
  minLength,
  maxLength,
  disabled,
  readOnly,
}) => {
  return (
    <span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={style}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
      />
      <label>{label}</label>
    </span>
  );
};

export default Input;
