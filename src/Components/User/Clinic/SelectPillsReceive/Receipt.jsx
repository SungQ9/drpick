import React from 'react';

import back from '../../../../img/back-arrow-icon.png';

const Receipt = ({ onButtonClick }) => {
  return (
    <div>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={onButtonClick}
          alt='back'
        />
        <h1 className='stepTitle'>영수증</h1>
      </div>
    </div>
  );
};

export default Receipt;
