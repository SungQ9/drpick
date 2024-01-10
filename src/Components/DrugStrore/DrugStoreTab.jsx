import React from 'react';
import { useNavigate } from 'react-router-dom';

function DrugStoreTab() {
  const navigate = useNavigate();

  return (
    <div className='tabContainer'>
      <ul>
        <li>
          {' '}
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/clinic');
            }}
          >
            대시보드
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/imageSearch');
            }}
          >
            약주문목록
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            약국정보수정
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a>관리자문의</a>
        </li>
      </ul>
    </div>
  );
}

export default DrugStoreTab;
