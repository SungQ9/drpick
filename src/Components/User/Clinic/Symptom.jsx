import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const Symptom = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>증상선택</h4>
      <button
        onClick={() => {
          navigate('/clinic/doctor');
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

export default Symptom;
