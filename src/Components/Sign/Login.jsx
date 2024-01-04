import React from 'react';
import '../../css/LayoutStyle.css';
import '../../css/Style.css';
import mail from '../../img/mail-icon.png';
import key from '../../img/key-icon.png';

const Login = () => {
  return (
    <div className='mainContainer'>
      <div className='loginForm'>
        <div className='loginWrapper'>
          <h4>
            로그인<span>비대면 진료서비스에 오신것을 환영합니다</span>
          </h4>
          <form action='' className='inputForm'>
            <span className='formSpan'>
              <input
                type='text'
                className='formInput'
                placeholder='아이디 입력'
              />
              <label>
                <img src={mail} />
              </label>
            </span>

            <span className='formSpan'>
              <input
                type='password'
                className='formInput'
                placeholder='비밀번호 입력'
              />
              <label>
                <img src={key} />
              </label>
            </span>

            <button>로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
