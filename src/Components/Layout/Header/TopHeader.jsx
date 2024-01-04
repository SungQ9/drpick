import React, { useState } from 'react';
import '../../../css/LayoutStyle.css';
import logo from '../../../img/logo.png';
import userLogo from '../../../img/icons8-user-100.png';
import { useNavigate } from 'react-router-dom';

const TopHeader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false); // 로그인하면 true로 바꿔주세요

  const loginBefore = () => {
    return (
      <ul>
        <li
          onClick={() => {
            navigate('/signUp');
          }}
        >
          회원가입
        </li>
        <li
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </li>
      </ul>
    );
  };

  const loginAfter = () => {
    return (
      <ul>
        {/*로그인하면 값 받아서 회원이름  */}
        <li>OOO회원님 어서오세요 </li>
        <li
          onClick={() => {
            navigate('/signUp');
          }}
        >
          <img src={userLogo} alt='User' />
          마이페이지
        </li>
      </ul>
    );
  };

  return (
    <div className='topHeader'>
      <div className='logoContainer'>
        <img
          src={logo}
          alt='Logo'
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      {/* 로그인시 li 변경 */}
      <div className='ul-Wrapper'>
        {isLoggedIn ? loginAfter() : loginBefore()}
      </div>
    </div>
  );
};

export default TopHeader;
