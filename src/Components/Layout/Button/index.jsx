import React from 'react';

const Button = ({ buttonType, buttonName, handleButtonClick }) => {
  if (buttonType === 'N') {
    return null;
  } else {
    if (buttonType === 'Review')
      return (
        <button
          id='deleteBtn'
          className='listBtn'
          onClick={() => {
            handleButtonClick(buttonName);
          }}
        >
          삭제
        </button>
      );
    else
      return (
        <button
          id='addBtn'
          className='listBtn'
          onClick={() => {
            handleButtonClick('추가');
          }}
        >
          추가
        </button>
      );
  }
};

export default Button;
