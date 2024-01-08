import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminTab() {
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
            회원관리
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            의사관리
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            병원관리
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            약국관리
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            문의관리
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a>통계</a>
        </li>
      </ul>
    </div>
  );
}

export default AdminTab;
