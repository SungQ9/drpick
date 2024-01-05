import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectAccept = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testTemp = location.state ? location.state.testTemp : null;
  return (
    <div>
      <h4>접수방법</h4>
      <h3>{testTemp}</h3>
      <button
        onClick={() => {
          navigate('/clinic/application');
        }}
      >
        일반접수
      </button>
      <button
        onClick={() => {
          navigate('/clinic/datetime');
        }}
      >
        예약접수
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

export default SelectAccept;
