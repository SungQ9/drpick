// 결제수단관리
import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';

const PaymentManagement = () => {
  const navigate = useNavigate();
  return (
    <div className='listWrapper'>
      <div className='listTitle'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h2>결제수단관리</h2>
      </div>
    </div>
  );
};

export default PaymentManagement;
