import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboard from '../../img/tab-dashboard-icon.png';
import doctor from '../../img/tab-doctor-icon.png';
import pill from '../../img/tab-pill-icon.png';
import edit from '../../img/tab-edit-icon.png';
import inquiry from '../../img/tab-inquiry-icon.png';

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
          <img src={dashboard} alt='dashboard' />
          대시보드
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/doctor');
          }}
        >
          <img src={doctor} alt='doctor' />
          비대면진료
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('history');
          }}
        >
          <img src={pill} alt='pill' />
          진료기록조회
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/doctor/profile');
          }}
        >
          <img src={edit} alt='edit' />
          의사정보수정
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('inquiry');
          }}
        >
          <img src={inquiry} alt='inquiry' />
          관리자문의
        </li>
      </ul>
    </div>
  );
}

export default DoctorTab;
