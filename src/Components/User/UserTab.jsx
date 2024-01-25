import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctor from '../../img/tab-doctor-icon.png';
import pill from '../../img/tab-pill-icon.png';
import chat from '../../img/tab-chat-icon.png';
import hospital from '../../img/tab-hospital-icon.png';

function UserTab() {
  const navigate = useNavigate();
  const [isSubtabVisible, setSubtabVisible] = useState(false);

  const handleToggleSubtab = () => {
    setSubtabVisible(!isSubtabVisible);
  };

  return (
    <ul className='tabUi'>
      <li
        className='tabLi'
        onClick={() => {
          navigate('/clinic');
        }}
      >
        <img src={doctor} alt='doctor' />
        비대면진료
      </li>
      <li
        className='tabLi'
        onClick={() => {
          navigate('/imageSearch');
        }}
      >
        <img src={pill} alt='pill' />
        약이미지검색
      </li>
      <li
        className='tabLi'
        onClick={() => {
          navigate('/chatBot');
        }}
      >
        <img src={chat} alt='chat' />챗 봇 검색
      </li>

      <li
        className={`tabLi ${isSubtabVisible ? 'clicked' : ''}`}
        onClick={handleToggleSubtab}
      >
        <img src={hospital} alt='hospital' />
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
      <li
        className='tabLi'
        onClick={() => {
          navigate('/payment');
        }}
      >
        결제(추후 삭제)
      </li>
    </ul>
  );
}

export default UserTab;
