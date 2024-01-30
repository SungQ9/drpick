import React from 'react';

const Button = ({
  buttonType,
  buttonName,
  handleButtonClick,
  item = {},
  className,
}) => {
  if (buttonType === 'N') {
    return null;
  } else {
    if (buttonType === 'Y' && buttonName === '삭제')
      return (
        <button
          id='deleteBtn'
          className={className}
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
          className={className}
          onClick={() => {
            handleButtonClick(buttonName);
          }}
        >
          {buttonName}
        </button>
      );
    else if (buttonName === '상세보기')
      return (
        <button
          id='addBtn'
          className={className}
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
          className={className}
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
