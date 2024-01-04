import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserTab() {
  const navigate = useNavigate();

  return (
    <div className='tabContainer'>
      <ul>
        <li
          onClick={() => {
            navigate('/clinic');
          }}
        >
          <img src='' alt='' />
          비대면진료
        </li>
        <li
          onClick={() => {
            navigate('/imageSearch');
          }}
        >
          <img src='' alt='' />
          약이미지검색
        </li>
        <li
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          <img src='' alt='' />챗 봇 검색
        </li>
        <li>
          <img src='' alt='' />
          병원/약국 찾기
        </li>
      </ul>
    </div>
  );
}

export default UserTab;
