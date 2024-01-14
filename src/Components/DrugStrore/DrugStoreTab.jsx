import React from 'react';
import { useNavigate } from 'react-router-dom';

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
          {' '}
          <img src='' alt='' />
          대시보드
        </li>
        <li
          className='tabLi'
          onClick={() => {
            handleButtonClick('history');
          }}
        >
          <img src='' alt='' />
          약주문목록
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/drugstore/profile');
          }}
        >
          <img src='' alt='' />
          약국정보수정
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

export default DrugStoreTab;
