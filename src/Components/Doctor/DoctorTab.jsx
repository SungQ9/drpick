import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorTab() {
  const navigate = useNavigate();
  const handleButtonClick = (type) => {
    navigate('/doctor/manager', { state: { selectedType: type } });
  };
  return (
    <div id='DoctorTab'>
      <ul className='tabUi'>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/');
          }}
        >
          {' '}
          <img src='' alt='' />
          대시보드
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/doctor');
          }}
        >
          <img src='' alt='' />
          비대면진료
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('history');
          }}
        >
          <img src='' alt='' />
          진료기록조회
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/doctor/profile');
          }}
        >
          <img src='' alt='' />
          의사정보수정
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('inquiry');
          }}
        >
          <img src='' alt='' />
          관리자문의
        </li>
      </ul>
    </div>
  );
}

export default DoctorTab;
