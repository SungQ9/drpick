import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const Subject = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>진료과목선택</h4>
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

export default Subject;
