import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTokenContext } from '../../../../Context/TokenContext';
import back from '../../../../../img/back-arrow-icon.png';
import ClinicButton from './ClinicButton';
import ClinicRoomButton from './ClinicRoomButton';
import Video from './VideoChat';
import Loading from '../../../ImageSearch/Loading';
import axios from 'axios';

const ClinicRoom = ({ item = {}, videoChatActive, setVideoChatActive }) => {
  const [clinicData, setClinicData] = useState(null);
  const [clinicStatus, setClinicStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { certificateNum } = location.state;
  const { token } = useTokenContext();
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      certificateNum: certificateNum,
    },
  };
  const handleEnterVideoChat = () => {
    setVideoChatActive(true); // 비디오 채팅 활성화
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (videoChatActive) {
    return (
      <div>
        <Video certificateNum={certificateNum} type={'user'} />
      </div>
    );
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8080/members/getCertificateInfo',
        config,
      );
      console.log('전달받은데이터 : ', response.data.body);
      setClinicData(response.data.body);
    } catch (error) {
      console.error('데이터 로딩 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
          <ClinicRoomButton
            status={clinicStatus}
            certificateNum={certificateNum}
            onEnterVideoChat={handleEnterVideoChat}
          />
        </div>
        {clinicData && (
          <div className='info'>
            <h3
              style={{
                marginLeft: '20px',
                color: '#727272',
                fontWeight: 'bold',
              }}
            >
              접수내역
            </h3>
            <p>
              접수시간: <span>{clinicData[0].reservationDate}</span>
            </p>
            <p>
              이름: <span>{clinicData[0].memberName}</span>
            </p>
            <p>
              증상: <span>{clinicData[0].patientComments}</span>
            </p>
          </div>
        )}
        <ClinicButton status={clinicStatus} />
      </div>
    </div>
  );
};

export default ClinicRoom;
