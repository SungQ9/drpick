import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicRoomButton = ({ status, certificateNum }) => {
  const navigate = useNavigate();
  if (status === false) {
    return (
      <div className='clinicRoomBtn'>
        <button
          onClick={() => {
            navigate(`/clinic/clinicRoom/${certificateNum}`);
          }}
        >
          진료실입장
        </button>
        <button style={{ marginLeft: '70px' }}>진료취소</button>
      </div>
    );
  } else {
    return (
      <div className='clinicRoomBtn'>
        <button>진단서보기</button>
        <button style={{ marginLeft: '70px' }}>처방전보기</button>
      </div>
    );
  }
};

export default ClinicRoomButton;
