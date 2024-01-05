import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>진료신청서</h4>
      <button
        onClick={() => {
          navigate('/clinic/payment');
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

export default ApplicationForm;
