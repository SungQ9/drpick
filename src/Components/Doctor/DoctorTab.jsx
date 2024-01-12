import React from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorTab() {
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
            비대면진료
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            진료기록조회
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            의사정보수정
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

export default DoctorTab;
