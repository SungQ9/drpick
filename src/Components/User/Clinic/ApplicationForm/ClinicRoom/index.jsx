import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModalContext } from '../../../../Context/ModalContext';
import { useVideoChat } from '../../../../Context/VideoChatContext';
import back from '../../../../../img/back-arrow-icon.png';
import ClinicButton from './ClinicButton';
import ClinicRoomButton from './ClinicRoomButton';
import Video from './VideoChat';

const ClinicRoom = ({ item = {} }) => {
  const { videoChatActive, setVideoChatActive } = useVideoChat();
  const { openModal } = useModalContext();
  const [clinicStatus, setClinicStatus] = useState(false);
  const location = useLocation();
  const { certificateNum } = location.state;

  const navigate = useNavigate();

  const handleOpenModal = (certNum) => {
    openModal(<Video certificateNum={certNum} />);
  };

  const handleEnterVideoChat = () => {
    setVideoChatActive(true); // 비디오 채팅 활성화
  };
  if (videoChatActive) {
    return (
      <div>
        <Video certificateNum={certificateNum} />
      </div>
    );
  }

  return (
    <div>
      {/*삭제예정 */}
      <button onClick={() => handleOpenModal(certificateNum)}>모달 열기</button>
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
          <ClinicRoomButton
            status={clinicStatus}
            certificateNum={certificateNum}
            onEnterVideoChat={handleEnterVideoChat}
          />
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
