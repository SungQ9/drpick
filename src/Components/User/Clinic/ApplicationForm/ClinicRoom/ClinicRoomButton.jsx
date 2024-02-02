import React from 'react';
import axios from 'axios';
import { useTokenContext } from '../../../../Context/TokenContext';

const ClinicRoomButton = ({ status, certificateNum, onEnterVideoChat }) => {
  const { token } = useTokenContext();

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { certificateNum: certificateNum },
  };

  const enterClinicRoom = async () => {
    try {
      const res = await axios
        .get('http://localhost:8080/members/updateCertificateStaus', config)
        .then(() => {
          onEnterVideoChat();
        });
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
