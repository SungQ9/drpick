import React, { useState, useEffect } from 'react';
import '../../../css/Style.css';
import logo from '../../../img/logo.png';
import userLogo from '../../../img/user-icon.png';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';

const TopHeader = () => {
  const navigate = useNavigate();
  const tokenContext = useTokenContext();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logoutHandler = () => {
    tokenContext.memberId = '';
    tokenContext.memberName = '';
    tokenContext.memberAuth = '';
    localStorage.setItem('accessToken', '');
    console.log('스토리지토큰값: ' + localStorage.getItem('accessToken'));
    setLoggedIn(false);
  };

  // 토큰의 값 유무에 따라 로그인상태 확인
  useEffect(() => {
    if (
      tokenContext.memberName != null &&
      tokenContext.memberName !== '' &&
      !isLoggedIn
    ) {
      setLoggedIn(true);
    } else if (
      (tokenContext.memberName == null || tokenContext.memberName === '') &&
      isLoggedIn
    ) {
      setLoggedIn(false);
    }
  }, [tokenContext.memberName, isLoggedIn]);

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
          className='loginLi'
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
        <li>
          <span>{tokenContext.memberName}회원님 어서오세요 </span>
        </li>
        <li>
          <p onClick={logoutHandler}>로그아웃</p>
        </li>
        <li className='mypageLi' onClick={() => navigate('/user')}>
          마이페이지
          <img src={userLogo} alt='User' />
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
      <div className='ul-Wrapper'>
        {isLoggedIn ? loginAfter() : loginBefore()}
      </div>
    </div>
  );
};

export default TopHeader;
