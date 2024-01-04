import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const DoctorDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4>의사 상세보기</h4>
      <button
        onClick={() => {
          navigate('/clinic/accept');
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
