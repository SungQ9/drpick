import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectPayment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>결제수단선택</h4>
      <button
        onClick={() => {
          navigate('/clinic/complete');
        }}
      >
        카드결제
      </button>
      <button
        onClick={() => {
          navigate('/clinic/complete');
        }}
      >
        포인트결제
      </button>
      <br />
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default SelectPayment;
