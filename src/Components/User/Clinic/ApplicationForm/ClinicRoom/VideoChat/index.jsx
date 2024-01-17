import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const Video = () => {
  const navigate = useNavigate();
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

  const { roomName } = useParams();

  // 미디어 스트림을 얻는 함수
  const getMedia = async () => {
    console.log('getMedia 함수 호출됨');

    try {
      const audioConstraints = selectedAudioDevice
        ? { deviceId: { exact: selectedAudioDevice } }
        : true;
      const videoConstraints = selectedVideoDevice
        ? { deviceId: { exact: selectedVideoDevice } }
        : true;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: videoConstraints,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (pcRef.current && socketRef.current) {
        // 스트림을 peerConnection에 등록
        stream.getTracks().forEach((track) => {
          pcRef.current.addTrack(track, stream);
        });

        pcRef.current.onicecandidate = (e) => {
          console.log('onicecandidate 등록');
          if (e.candidate && socketRef.current) {
            console.log('Sending ICE candidate to server');
            socketRef.current.emit('candidate', e.candidate, roomName);
          }
        };

        pcRef.current.ontrack = (e) => {
          console.log('ontrack 호출');
          console.log('Received remote track');
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = e.streams[0];
          }
        };
      }
    } catch (e) {
      console.error('Error accessing media devices:', e);
    }
  };

  // Offer 생성 함수
  const createOffer = async () => {
    console.log('Creating and sending Offer');
    if (pcRef.current && socketRef.current) {
      try {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        console.log('Local SDP (Offer):', offer);
        socketRef.current.emit('offer', offer, roomName);
      } catch (e) {
        console.error('Error creating and sending Offer:', e);
      }
    }
  };

  // Answer 생성 함수
  const createAnswer = async (offer) => {
    console.log('Creating and sending Answer');
    if (pcRef.current && socketRef.current) {
      try {
        await pcRef.current.setRemoteDescription(offer);
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        console.log('Local SDP (Answer):', answer);
        socketRef.current.emit('answer', answer, roomName);
      } catch (e) {
        console.error('Error creating and sending Answer:', e);
      }
    }
  };

  // 아래로 스크롤하는 함수
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      console.log(`Sending message: ${message}`);
      socketRef.current.emit('message', message, roomName);

      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { text: message, type: 'sent', time: currentTime },
        ];
        console.log('newMessages: ', newMessages);
        return newMessages;
      });
      scrollToBottom(); // 스크롤 내리기
      setMessageInput(''); // 메시지 입력 상태 초기화
    }
  };

  useEffect(() => {
    // 소켓 서버에 연결
    socketRef.current = io('175.114.130.12:4000');
    // WebRTC Peer Connection 생성
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

    // 소켓 이벤트 핸들링
    socketRef.current.on('all_users', (allUsers) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on('getOffer', (offer) => {
      console.log('Received Offer');
      createAnswer(offer);
    });

    socketRef.current.on('getAnswer', (answer) => {
      console.log('Received Answer');
      if (pcRef.current) {
        pcRef.current.setRemoteDescription(answer);
      }
    });

    socketRef.current.on('getCandidate', async (candidate) => {
      if (pcRef.current) {
        await pcRef.current.addIceCandidate(candidate);
      }
    });

    // 채팅 메시지 수신 핸들링
    socketRef.current.on('getMessage', (message) => {
      console.log('receive message: ', message);
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
      scrollToBottom();
    });

    socketRef.current.emit('join_room', {
      room: roomName,
    });

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, [selectedAudioDevice, selectedVideoDevice]);

  // 마이크와 카메라 장치 목록 불러오기
  const getMediaDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(
        (device) => device.kind === 'audioinput',
      );
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );
      setAudioDevices(audioDevices);
      setVideoDevices(videoDevices);
      setSelectedAudioDevice(audioDevices[0]?.deviceId || null);
      setSelectedVideoDevice(videoDevices[0]?.deviceId || null);
    } catch (e) {
      console.error('Error getting media devices:', e);
    }
  };

  useEffect(() => {
    getMediaDevices(); // 마이크와 카메라 장치 목록 불러오기
  }, []);

  // 마이크 디바이스 변경 핸들러
  const handleAudioDeviceChange = (event) => {
    const selectedDeviceId = event.target.value;
    setSelectedAudioDevice(selectedDeviceId);
  };

  // 카메라 디바이스 변경 핸들러
  const handleVideoDeviceChange = (event) => {
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
              <select
                value={selectedVideoDevice || ''}
                onChange={handleVideoDeviceChange}
              >
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
              onClick={() => {
                navigate(-1);
              }}
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
