// 회원정보수정
import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';

const UserProfileEdit = () => {
  const navigate = useNavigate();
  return (
    <div className='listWrapper'>
      <div className='listTitle'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h2>회원정보수정</h2>
      </div>
      <div id='signUpInputForm' className='signUpInputForm'>
        <table id='signUpTable' className='signUpTable'>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='text'
                  className='member_name'
                  id='name'
                  style={{ width: '500px' }}
                  minLength={2}
                  max={15}
                  disabled
                  // value={selectedName.trim()}
                />
                <label>이름</label>
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='text'
                  className='member_birth'
                  id='birth'
                  minLength={8}
                  maxLength={8}
                  style={{ width: '500px' }}
                  disabled
                />
                <label>생년월일</label>
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='text'
                  className='member_email'
                  id='email'
                  style={{ width: '500px' }}
                  disabled
                />
                <label>아이디</label>
              </span>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='text'
                  className='member_tel'
                  id='tel'
                  placeholder="　'-' 없이 입력하세요"
                  style={{ width: '500px' }}
                />
                <label>전화번호</label>
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='password'
                  className='member_pwd'
                  id='pwd'
                  style={{ width: '500px' }}
                  placeholder='　영어,숫자,특수문자를 포함한 8~20자 '
                  minLength={8}
                  maxLength={20}
                />
                <label>비밀번호</label>
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='password'
                  className='member_ckpwd'
                  style={{ width: '500px' }}
                  minLength={8}
                  maxLength={20}
                />
                <label style={{ fontSize: '12px' }}>비밀번호확인</label>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <input
                  type='text'
                  className='member_addr_main'
                  id='addr_main'
                  placeholder='　주소를 입력해주세요'
                />
                <label>주소</label>
              </span>
            </td>
            <td>
              <button id='addrBtn'>주소검색</button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>
                <input
                  type='text'
                  className='member_addr_detail'
                  id='addr_detail'
                  style={{ width: '500px' }}
                  placeholder='　나머지 주소를 입력해주세요'
                />
                <label style={{ fontSize: '11px' }}>상세주소</label>
              </span>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <button className='signUpBtn'>수정</button>
              <button className='signUpBtn' style={{ background: '#AECCC8' }}>
                취소
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default UserProfileEdit;
