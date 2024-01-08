import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserTab() {
  const navigate = useNavigate();
  const [isSubtabVisible, setSubtabVisible] = useState(false);

  const handleToggleSubtab = () => {
    setSubtabVisible(!isSubtabVisible);
  };

  return (
    <div className='tabContainer'>
      <ul className='tabUi'>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/clinic');
          }}
        >
          <img src='' alt='' />
          비대면진료
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/imageSearch');
          }}
        >
          <img src='' alt='' />
          약이미지검색
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/chatBot');
          }}
        >
          <img src='' alt='' />챗 봇 검색
        </li>
        <li
          className={`tabLi ${isSubtabVisible ? 'clicked' : ''}`}
          onClick={handleToggleSubtab}
        >
          <img src='' alt='' />
          병원/약국 찾기
          {isSubtabVisible && (
            <ul className='subtabUi'>
              <li
                className='subtabLi'
                onClick={() => {
                  navigate('/searchHospital');
                }}
              >
                병원찾기
              </li>
              <li
                className='subtabLi'
                onClick={() => {
                  navigate('/searchDrugStore');
                }}
              >
                약국찾기
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default UserTab;
