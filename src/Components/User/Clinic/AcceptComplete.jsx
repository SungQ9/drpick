import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const AcceptComplete = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h4>진료신청완료</h4>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        확인
      </button>
    </div>
  );
};

export default AcceptComplete;
