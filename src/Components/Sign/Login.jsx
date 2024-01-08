import React, { useState } from 'react';
import '../../css/LayoutStyle.css';
import '../../css/Style.css';
import mail from '../../img/mail-icon.png';
import key from '../../img/key-icon.png';
import axios from 'axios'; // axios 라이브러리 추가
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // 상태 정의
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPwd, setMemberPwd] = useState('');
  const navigate = useNavigate();

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 API 엔드포인트
    const loginUrl = 'http://localhost:8080/members/login';

    try {
      // 로그인 요청
      const response = await axios.post(
        loginUrl,
        {
          memberEmail,
          memberPwd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // 로그인 성공 후에 할 작업들...
      console.log('로그인 성공:', response.data);

      // 토큰 콘솔에 출력
      console.log('토큰:', response.data.accessToken);

      navigate('/');
    } catch (error) {
      // 로그인 실패 후에 할 작업들...
      console.error('로그인 실패:', error.message);
    }
  };

  return (
    <div className='mainContainer'>
      <div className='loginForm'>
        <div className='loginWrapper'>
          <h4>
            로그인<span>비대면 진료서비스에 오신것을 환영합니다</span>
          </h4>

          <form action='' className='inputForm' onSubmit={handleLogin}>
            <span className='formSpan'>
              <input
                type='text'
                className='formInput'
                placeholder='아이디 입력'
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <label>
                <img src={mail} alt='Mail Icon' />
              </label>
            </span>

            <span className='formSpan'>
              <input
                type='password'
                className='formInput'
                placeholder='비밀번호 입력'
                value={memberPwd}
                onChange={(e) => setMemberPwd(e.target.value)}
              />
              <label>
                <img src={key} alt='Key Icon' />
              </label>
            </span>

            <button type='submit'>로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
