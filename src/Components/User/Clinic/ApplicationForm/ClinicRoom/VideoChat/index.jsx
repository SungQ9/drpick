import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../../../Layout/SearchBar';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const Video = () => {
  const navigate = useNavigate();
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const videoRef = useRef();
  const chatInputRef = useRef();

  useEffect(() => {
    const socket = io('http://localhost:3001');

    const initWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;

        // WebRTC 연결 설정
        const p = new Peer({ initiator: true, trickle: false, stream });

        p.on('signal', (data) => {
          // 시그널 데이터를 서버를 통해 다른 사용자에게 전송
          socket.emit('sendSignal', data);
        });

        p.on('stream', (remoteStream) => {
          // 상대방 화면 출력
          const remoteVideo = document.createElement('video');
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
          document.querySelector('.mainView').innerHTML = '';
          document.querySelector('.mainView').appendChild(remoteVideo);
        });

        p.on('data', (data) => {
          // 데이터 수신
          const receivedMessage = data.toString('utf8');
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        setPeer(p);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initWebRTC();

    socket.on('receiveSignal', (data) => {
      // 서버를 통해 받은 시그널 데이터로 WebRTC 연결 설정
      peer.signal(data);
    });

    socket.on('userConnected', () => {
      // 다른 사용자 연결됨
    });

    socket.on('userDisconnected', () => {
      // 다른 사용자 연결 해제됨
    });

    return () => {
      // 컴포넌트 언마운트 시 WebRTC 및 소켓 해제
      if (peer) {
        peer.destroy();
      }
      socket.disconnect();
    };
  }, [peer]);

  const sendMessage = () => {
    if (peer && messageInput.trim() !== '') {
      peer.send(messageInput);
      setMessages((prevMessages) => [...prevMessages, `You: ${messageInput}`]);
      setMessageInput('');
    }
  };

  return (
    <div className='roomWrapper'>
      <h1>진료실</h1>
      <div className='roomContainer'>
        <div className='leftSide'>
          <div className='mainView'></div>
        </div>
        <div className='rightSide'>
          <div className='rightSideTop'>
            <div className='subView'>
              <video
                ref={videoRef}
                muted
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className='optionPart'>
              <input
                type='text'
                style={{ width: '200px' }}
                value={'마이크선택'}
              />
              <input type='text' style={{ width: '200px' }} value={'캠선택'} />
            </div>
          </div>
          <div className='rightSideBottom'>
            <div className='logTextArea'>
              <textarea value={messages.join('\n')} readOnly></textarea>
            </div>
            <SearchBar
              type={'Chat'}
              placeholder={'메세지를 입력해주세요'}
              inputRef={chatInputRef}
              value={messageInput}
              onChange={(evt) => setMessageInput(evt.target.value)}
              onKeyPress={(evt) => {
                if (evt.key === 'Enter' && !evt.shiftKey) {
                  evt.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              style={{ width: '500px', height: '60px', fontSize: '20px' }}
              onClick={sendMessage}
            >
              메세지 보내기
            </button>
            <button
              style={{ width: '500px', height: '60px', fontSize: '20px' }}
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
