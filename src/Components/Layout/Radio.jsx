import React from 'react';

const Radio = ({ id, value, name, label, checked, onChange }) => {
  return (
    <>
      <input
        type='radio'
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </>
  );
};

export default Radio;
