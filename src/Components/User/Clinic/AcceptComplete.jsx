import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const AcceptComplete = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();

  return (
    <div className='completeWrapper '>
      <div className='completeText'>
        <h2>진료신청완료</h2>
        <p>진료 시작 전 알려드릴게요</p>
        <p>최대 대기시간: 20분 이내</p>
      </div>
      <div className='completeTextarea'>
        <textarea
          value={`메인화면에 비대면 진료 신청하기
또는 
마이페이지에서  진료목록을 선택하면 
진료실에 입장할 수 있어요`}
          readOnly
        ></textarea>
      </div>

      <button
        className='clinicBtn-long'
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
