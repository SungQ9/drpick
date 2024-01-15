import React, { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

import back from '../../../../../img/back-arrow-icon.png';
import ClinicButton from './ClinicButton';
import ClinicRoomButton from './ClinicRoomButton';

const ClinicRoom = () => {
  const [clinicStatus, setClinicStatus] = useState(false);

  const navigate = useNavigate();
  return (
    <div>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>진료신청서</h1>
      </div>
      <div className='clinicRoomWrapper'>
        <div className='room'>
          <h2 style={{ color: '#ffffff' }}>비대면진료실</h2>
          <span style={{ color: '#cecece' }}>이OO의사 밝은이비인후과의원</span>
          <ClinicRoomButton status={clinicStatus} />
        </div>
        <div className='info'>
          <h3
            style={{ marginLeft: '20px', color: '#727272', fontWeight: 'bold' }}
          >
            접수내역
          </h3>
          <p>
            접수시간:<span></span>
          </p>
          <p>
            이름:<span></span>
          </p>
          <p>
            증상:<span></span>
          </p>
        </div>
        <ClinicButton status={clinicStatus} />
      </div>
    </div>
  );
};

export default ClinicRoom;
