import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectDoctor = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>의사선택</h4>
      <button
        onClick={() => {
          navigate('/clinic/detail');
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

export default SelectDoctor;
