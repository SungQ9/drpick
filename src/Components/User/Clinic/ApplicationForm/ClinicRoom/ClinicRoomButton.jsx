import React from 'react';
import axios from 'axios';

const ClinicRoomButton = ({ status, onEnterVideoChat }) => {
  const enterClinicRoom = async () => {
    try {
      //
      const res = await axios.post('YOUR_BACKEND_ENDPOINT', {});

      onEnterVideoChat();
    } catch (error) {
      console.error('진료실 입장 Error:', error);
    }
  };

  if (status === false) {
    return (
      <div className='clinicRoomBtn'>
        <button onClick={enterClinicRoom}>진료실입장</button>
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
