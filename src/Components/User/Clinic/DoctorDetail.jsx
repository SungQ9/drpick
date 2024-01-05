import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';
import ClinicContext from './ClinicContext';

const DoctorDetail = () => {
  const navigate = useNavigate();
  const clinicContext = useContext(ClinicContext);
  const testTemp = clinicContext ? clinicContext.testProp : null;
  return (
    <div>
      <h4>의사 상세보기</h4>
      <h3>값 : {testTemp}</h3>
      <button
        onClick={() => {
          navigate('/clinic/accept', { state: { testTemp } });
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

export default DoctorDetail;
