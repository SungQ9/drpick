import React from 'react';

const Button = ({ buttonType, buttonName, handleButtonClick }) => {
  if (buttonType === 'N') {
    return null;
  } else {
    if (buttonType === 'Y' && buttonName === '삭제')
      return (
        <button
          id='deleteBtn'
          className='listBtn'
          onClick={() => {
            handleButtonClick(buttonName);
          }}
        >
          {buttonName}
        </button>
      );
    else if (buttonType === 'Y' && buttonName === '작성하기')
      return (
        <button
          id='addBtn'
          className='listBtn'
          onClick={() => {
            handleButtonClick(buttonName);
          }}
        >
          {buttonName}
        </button>
      );
    else {
      return (
        <button
          id='addBtn'
          className='listBtn'
          onClick={() => {
            handleButtonClick(buttonName);
          }}
        >
          {buttonName}
        </button>
      );
    }
  }
};

export default Button;
