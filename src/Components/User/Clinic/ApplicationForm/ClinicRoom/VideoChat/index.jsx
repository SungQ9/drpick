import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../../../Layout/SearchBar';

const Video = () => {
  const navigate = useNavigate();
  return (
    <div className='roomWrapper'>
      <h1>진료실</h1>
      <div className='roomContainer'>
        <div className='leftSide'>
          <div className='mainView'>상대방화면</div>
        </div>
        <div className='rightSide'>
          <div className='rightSideTop'>
            <div className='subView'>본인화면</div>
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
              <textarea value={'채팅나오는곳'}></textarea>
            </div>
            <SearchBar type={'Chat'} placeholder={'메세지를 입력해주세요'} />
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
