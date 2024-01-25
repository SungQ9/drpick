import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboard from '../../img/tab-dashboard-icon.png';
import pill from '../../img/tab-pill-icon.png';
import drugstore from '../../img/tab-drugstore-icon.png';
import inquiry from '../../img/tab-inquiry-icon.png';

function DrugStoreTab() {
  const navigate = useNavigate();
  const handleButtonClick = (type) => {
    navigate('/drugstore', { state: { selectedType: type } });
  };

  return (
    <div id='DrugStoreTab'>
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
            handleButtonClick('history');
          }}
        >
          <img src={pill} alt='pill' />
          약주문목록
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/drugstore/profile');
          }}
        >
          <img src={drugstore} alt='drugstore' />
          약국정보수정
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('inquiry');
          }}
        >
          <img
            src={inquiry}
            alt='inquiry'
            style={{ width: '35px', height: '35px' }}
          />
          관리자문의
        </li>
      </ul>
    </div>
  );
}

export default DrugStoreTab;
