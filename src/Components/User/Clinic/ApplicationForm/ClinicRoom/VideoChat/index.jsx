import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useModalContext } from '../../../../../Context/ModalContext';
import ClinicEndModal from '../../../../../ModalComponent/Doctor/ClinicEndModal';

const Video = ({
  certificateNum: propCertificateNum,
  type,
  onClose,
  fetchData,
}) => {
  const navigate = useNavigate();
  const { certificateNum: urlCertificateNum } = useParams();
  const roomName = propCertificateNum || urlCertificateNum;
  const socketRef = useRef(); // 소켓 연결을 위한 ref
  const myVideoRef = useRef(null); // 나의 비디오 요소 ref
  const remoteVideoRef = useRef(null); // 원격 비디오 요소 ref
  const pcRef = useRef(); // WebRTC Peer Connection ref
  const chatInputRef = useRef(null); // 메시지 입력을 위한 ref
  const scrollRef = useRef();

  const [messageInput, setMessageInput] = useState(''); // 메시지 입력 상태
  const [messages, setMessages] = useState([]); // 메시지 목록 상태
  const [audioDevices, setAudioDevices] = useState([]); // 마이크 장치 목록
  const [videoDevices, setVideoDevices] = useState([]); // 카메라 장치 목록
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null); // 선택된 마이크 장치
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null); // 선택된 카메라 장치
  const { openModal } = useModalContext();

  const handleClick = () => {
    if (type === 'doctor') {
      onClose();
      openModal(
        <ClinicEndModal certificateNum={roomName} fetchData={fetchData} />,
      );
    } else if (type === 'user') {
      navigate(-1);
    }
  };

  // Offer 생성 함수
  const createOffer = async () => {
    console.log('createOffer: Offer 생성');
    try {
      const offer = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', offer, roomName);
    } catch (e) {
      console.error('createOffer 에러:', e);
    }
  };

  // Answer 생성 함수
  const createAnswer = async (offer) => {
    console.log('createAnswer: Answer 생성');
    try {
      await pcRef.current.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socketRef.current.emit('answer', answer, roomName);
      const answerDesc = new RTCSessionDescription(answer);
      console.log('Received answer SDP:', answerDesc);
    } catch (e) {
      console.error('createAnswer 에러', e);
    }
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      myVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => {
        console.log('Adding track to the PeerConnection', track);
        pcRef.current.addTrack(track, stream);
      });
    } catch (e) {
      console.error('미디어 디바이스 접근 에러:', e);
    }
  };
  // 소켓 연결 및 이벤트 설정
  useEffect(() => {
    console.log('useEffect: 소켓 연결 및 WebRTC 설정');

    // RTCPeerConnection 설정
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
          urls: 'turn:drpickturnserver.com:6000', // TURN 서버 주소
          username: 'sungq', // TURN 서버 사용자 이름
          credential: '1234', // TURN 서버 비밀번호
        },
      ],
    });
    pcRef.current = pc;

    // ontrack 이벤트 핸들러 설정
    pc.ontrack = (e) => {
      console.log('ontrack event fired', e);
      if (e.streams && e.streams[0]) {
        remoteVideoRef.current.srcObject = e.streams[0];
      } else {
        console.error('ontrack event fired, but no stream is present');
      }
    };

    // ICE candidate 이벤트 핸들러
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socketRef.current.emit('candidate', e.candidate, roomName);
      }
    };
    // ICE 연결 상태 변경 이벤트 핸들러
    pcRef.current.oniceconnectionstatechange = () => {
      console.log(`ICE 연결상태: ${pcRef.current.iceConnectionState}`);
    };

    // 미디어 스트림을 얻는 함수
    socketRef.current = io('http://localhost:4000');

    // 미디어 스트림을 얻음
    getMedia();

    socketRef.current.emit('join_room', { room: roomName }, () => {
      console.log('방에입장합니다');
    });

    // Signaling 데이터 수신 핸들러 설정
    socketRef.current.on('all_user', () => {
      console.log('all_user: Offer 생성 요청 수신');
      createOffer();
    });

    socketRef.current.on('getOffer', async (offer) => {
      console.log('getOffer: Offer 수신');
      await getMedia();
      createAnswer(offer);
      if (!offer) {
        console.error('Received offer is null or undefined.');
        return;
      }
      if (typeof offer === 'string') {
        // JSON 문자열로 수신된 경우, 객체로 변환
        offer = JSON.parse(offer);
      }
      if (!offer.sdp || !offer.type) {
        console.error('Invalid offer:', offer);
        return;
      }

      const offerDesc = new RTCSessionDescription(offer);
      console.log('Received offer SDP:', offerDesc);
      pcRef.current
        .setRemoteDescription(offerDesc)
        .then(() => {
          console.log('setRemoteDescription success.');
          createAnswer();
          return pcRef.current.createAnswer();
        })
        .then((answer) => {
          console.log('createAnswer success.');
          return pcRef.current.setLocalDescription(answer);
        })
        .then(() => {
          console.log('setLocalDescription success.');
          // 여기서 answer를 JSON 객체로 전송해야 합니다.
          socketRef.current.emit(
            'answer',
            pcRef.current.localDescription.toJSON(),
            roomName,
          );
        })
        .catch(console.error);
    });

    socketRef.current.on('getAnswer', (answer) => {
      console.log('getAnswer: Answer 수신 ');
      pcRef.current
        .setRemoteDescription(new RTCSessionDescription(answer))
        .catch((e) => console.error('setRemoteDescription error', e));
    });

    socketRef.current.on('getCandidate', (candidate) => {
      console.log('getCandidate: candidate 수신 ');
      pcRef.current
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error('addIceCandidate error', e));
    });

    // 채팅 메시지 수신 핸들링
    socketRef.current.on('getMessage', (message) => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }); // 현재 시간을 가져옴
      const newMessage = { text: message, type: 'received', time: currentTime };
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, newMessage];
        return newMessages;
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, [roomName]); // 의존성 배열에 roomName 추가

  // 카메라 변경 시 호출될 함수
  const changeCamera = async (newDeviceId) => {
    console.log(`changeCamera: 카메라 변경 - ${newDeviceId}`);
    await getMedia({
      video: { deviceId: { exact: newDeviceId } },
      audio: true,
    });
  };
  // 마이크 및 카메라 장치 목록 가져오기
  useEffect(() => {
    console.log('useEffect: 마이크 및 카메라 장치 목록 가져오기');
    const getMediaDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(
          devices.filter((device) => device.kind === 'audioinput'),
        );
        setVideoDevices(
          devices.filter((device) => device.kind === 'videoinput'),
        );
      } catch (e) {
        console.error('useEffect: 마이크 및 카메라 장치 목록 :', e);
      }
    };

    getMediaDevices();
  }, [selectedAudioDevice, selectedVideoDevice]);

  // 메시지 전송 함수
  const sendMessage = () => {
    const message = messageInput.trim();
    if (message) {
      // 현재 시간을 가져옴
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      socketRef.current.emit('message', message, roomName);
      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { text: message, type: 'sent', time: currentTime },
        ];
        return newMessages;
      });
      setMessageInput(''); // 메시지 입력 상태 초기화
    }
  };

  // 스크롤 아래로 이동 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 마이크 디바이스 변경 핸들러
  const handleAudioDeviceChange = (event) => {
    const selectedDeviceId = event.target.value;
    setSelectedAudioDevice(selectedDeviceId);
  };

  // 카메라 디바이스 변경 핸들러
  const handleVideoDeviceChange = async (event) => {
    const selectedDeviceId = event.target.value;
    setSelectedVideoDevice(selectedDeviceId);
  };

  return (
    <div className='roomWrapper'>
      <h1>진료실</h1>
      <div className='roomContainer'>
        <div className='leftSide'>
          {/* 왼쪽 화면 (상대방 화면) */}
          <div className='mainView'>
            <video
              ref={remoteVideoRef}
              autoPlay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className='rightSide'>
          <div className='rightSideTop'>
            {/* 오른쪽 화면 (내 화면) */}
            <div className='subView'>
              <video
                ref={myVideoRef}
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            {/* 카메라 마이크 설정 */}
            <div className='optionPart'>
              <select
                value={selectedAudioDevice || ''}
                onChange={handleAudioDeviceChange}
              >
                {audioDevices.map((device) => (
                  <option
                    key={device.deviceId}
                    value={device.deviceId}
                    style={{ width: '150px' }}
                  >
                    {device.label || `마이크 ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <select value={selectedVideoDevice || ''} onChange={changeCamera}>
                {videoDevices.map((device) => (
                  <option
                    style={{ width: '150px' }}
                    key={device.deviceId}
                    value={device.deviceId}
                  >
                    {device.label || `카메라 ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='rightSideBottom'>
            {/* 채팅 및 메시지 입력 UI */}
            <div className='logTextArea' ref={scrollRef}>
              <ul>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    className={`message ${
                      message.type === 'sent' ? 'sent' : 'received'
                    }`}
                  >
                    {` [${message.time}] ${message.text} `}
                  </li>
                ))}
              </ul>
            </div>
            <input
              type='text'
              style={{ width: '386px' }}
              ref={chatInputRef}
              placeholder='메세지를 입력해주세요'
              value={messageInput}
              onChange={(evt) => setMessageInput(evt.target.value)}
              onKeyPress={(evt) => {
                if (evt.key === 'Enter' && !evt.shiftKey) {
                  evt.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button style={{ marginLeft: '10px' }} onClick={sendMessage}>
              메세지 보내기
            </button>
            <button
              style={{ width: '500px', height: '45px', fontSize: '17px' }}
              onClick={handleClick}
            >
              종료하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
