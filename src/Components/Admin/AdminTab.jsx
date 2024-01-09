import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminTab() {
  const navigate = useNavigate();

  return (
    <ul className='tabUi'>
      <li className='tabLi'>
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
      <li className='tabLi'>
        <img src='' alt='' />
        <a
          onClick={() => {
            navigate('/imageSearch');
          }}
        >
          회원관리
        </a>
      </li>
      <li className='tabLi'>
        <img src='' alt='' />
        <a
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          의사관리
        </a>
      </li>
      <li className='tabLi'>
        <img src='' alt='' />
        <a
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          병원관리
        </a>
      </li>
      <li className='tabLi'>
        <img src='' alt='' />
        <a
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          약국관리
        </a>
      </li>
      <li className='tabLi'>
        <img src='' alt='' />
        <a
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          문의관리
        </a>
      </li>
      <li className='tabLi'>
        <img src='' alt='' />
        <a>통계</a>
      </li>
    </ul>
  );
}

export default AdminTab;
