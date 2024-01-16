import React from 'react';

import back from '../../../../img/back-arrow-icon.png';
import { useNavigate } from 'react-router-dom';

const Delivery = ({ onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'></h1>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', width: '1000px' }}
      >
        <div style={{ width: '190px', height: '50px', textAlign: 'left' }}>
          <h3>약수령방법을 선택하면 안전하게 배달해드립니다</h3>
          <h3>주소등록 · 확인</h3>
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li>오늘배송</li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
