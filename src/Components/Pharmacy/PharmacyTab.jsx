import React from 'react';
import { useNavigate } from 'react-router-dom';

function PharmacyTab() {
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
            비대면진료
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/imageSearch');
            }}
          >
            약이미지검색
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a
            onClick={() => {
              navigate('/chatBot');
            }}
          >
            챗 봇 검색
          </a>
        </li>
        <li>
          <img src='' alt='' />
          <a>병원/약국 찾기</a>
        </li>
      </ul>
    </div>
  );
}

export default PharmacyTab;
