import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectDateTime = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>예약접수 날짜시간</h4>
      <button
        onClick={() => {
          navigate('/clinic/application');
        }}
      >
        다음
      </button>
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

export default SelectDateTime;
