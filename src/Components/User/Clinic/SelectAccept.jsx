import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectAccept = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultTemp = location.state ? location.state.testTemp3 : null;
  const { testProp, testProp2, testProp3, testProp4 } = useClinicContext();

  return (
    <div>
      <h4>접수방법</h4>
      <h3>이전페이지에서 넘겨받은 값 : {resultTemp}</h3>
      <h3>Context에서 가져온 값</h3>
      <h2>{testProp}</h2>
      <h2>{testProp2}</h2>
      <h2>{testProp3}</h2>
      <h2>{testProp4}</h2>
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
