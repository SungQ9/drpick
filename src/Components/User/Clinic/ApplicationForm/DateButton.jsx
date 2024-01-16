import React from 'react';

const DateButton = ({ onClick, isSelected, label, setDateValue }) => {
  return (
    <button
      style={{
        marginRight: '10px',
        backgroundColor: isSelected ? '#11C2AD' : 'transparent',
        color: isSelected ? '#FFFFFF' : '#727272',
        border: isSelected ? 'none' : '1px solid #cecece',
      }}
      onClick={() => {
        onClick();
        setDateValue(
          label === '오늘'
            ? new Date()
            : new Date(Date.now() + 24 * 60 * 60 * 1000),
        );
      }}
    >
      {label}
    </button>
  );
};

export default DateButton;
