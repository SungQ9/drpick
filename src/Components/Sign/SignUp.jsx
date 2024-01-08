import React, { useState } from 'react';
import '../../css/UserStyle.css';
import '../../css/Style.css';
import axios from 'axios';

const SignUp = () => {
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    setSelectedFileName(fileInput.files[0].name);
  };

  const handleFileBtnClick = () => {
    document.getElementById('selectedFile').click();
  };

  const submitBtnClick = () => {
    const nameElement = document.getElementById('name');
    const birthElement = document.getElementById('birth');
    const sexElement = document.querySelector('.sex:checked');
    const emailElement = document.getElementById('email');
    const domainElement = document.getElementById('email_domain');
    const telElement = document.getElementById('tel');
    const pwdElement = document.getElementById('pwd');
    const addrMainElement = document.getElementById('addr_main');
    const addrDetailElement = document.getElementById('addr_detail');

    // 각각의 요소가 null인지 확인
    if (
      !nameElement ||
      !birthElement ||
      !sexElement ||
      !emailElement ||
      !domainElement ||
      !telElement ||
      !pwdElement ||
      !addrMainElement ||
      !addrDetailElement
    ) {
      console.error('하나 이상의 요소를 찾을 수 없습니다.');
      return;
    }

    const name = document.getElementById('name').value;
    const birth = document.getElementById('birth').value;
    const sex = document.querySelector('.sex:checked').value;
    const email = document.getElementById('email').value;
    const domain = document.getElementById('email_domain').value;
    const member_email = email + domain;
    const tel = document.getElementById('tel').value;
    const pwd = document.getElementById('pwd').value;
    const addr_main = document.getElementById('addr_main').value;
    const addr_detail = document.getElementById('addr_detail').value;

    // 데이터 객체 생성
    const data = {
      memberName: name,
      memberBirth: birth,
      memberSex: sex,
      memberEmail: member_email,
      memberTel: tel,
      memberPwd: pwd,
      memberAddrMain: addr_main,
      memberAddrDetail: addr_detail,

      // ... 추가 필요한 필드들
    };

    // 서버로 데이터 전송
    axios
      .post('http://localhost:8080/members/signup', data)
      .then((res) => {
        // 서버 응답에 대한 처리
        console.log(res.data);
      })
      .catch((e) => {
        // 오류 처리
        console.error('회원가입에러' + e.getMeesage);
      });
  };

  return (
    <div className='mainContainer'>
      <div className='signUpForm'>
        <div className='signUpWrapper'>
          <h4>
            회원가입<span>회원가입</span>
          </h4>
          <form
            action='http://localhost:8080/members/signup'
            method='POST'
            className='signUpInputForm'
          >
            <table className='signUpTable'>
              <tr>
                <td colSpan={2}>
                  <span>
                    <input
                      type='text'
                      className='member_name'
                      id='name'
                      placeholder='　이름을 입력하세요'
                      style={{ width: '500px' }}
                      minLength={2}
                      max={15}
                    />
                    <label>이름</label>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <input
                      type='text'
                      className='member_birth'
                      id='birth'
                      placeholder='　생년월일 8자리를 입력해주세요 ( 년도/월/일 )'
                      minLength={8}
                      maxLength={8}
                    />
                    <label>생년월일</label>
                  </span>
                </td>
                <td>
                  <input type='radio' className='sex' id='sex' value='male' />{' '}
                  남자
                  <input type='radio' className='sex' id='sex' value='female' />
                  여자
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <input
                      type='text'
                      className='member_email'
                      id='email'
                      placeholder='　이메일형식'
                    />
                    <label>아이디</label>
                  </span>
                </td>
                <td>
                  {' '}
                  <select className='member_email_domain' id='email_domain'>
                    <option value='@naver.com'>naver.com</option>
                    <option value='@daum.net'>daum.net</option>
                    <option value='@google.com'>google.com</option>
                    <option value=''>직접입력</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <input
                      type='text'
                      className=''
                      placeholder='　인증번호를 입력하세요'
                    />
                    <label>인증번호</label>
                  </span>
                </td>
                <td>
                  <button id='emailBtn'>인증받기</button>
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
                    <label style={{ fontSize: '11px' }}>나머지주소</label>
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span id='partnerShipSpan'>
                    <label id='partnerShip'>제휴여부</label>{' '}
                    <input type='radio' className='member_sex' value='male' />{' '}
                    의사
                    <input type='radio' className='member_sex' value='female' />
                    약국 <span id='subSpan'>* 해당 가입자만 작성바랍니다</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <input type='text' value={selectedFileName} readOnly />
                    <label>증명파일</label>
                  </span>
                </td>
                <td>
                  <input
                    type='button'
                    id='fileBtn'
                    value='파일업로드'
                    onClick={handleFileBtnClick}
                  />
                  <input
                    type='file'
                    id='selectedFile'
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={handleFileInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button onClick={submitBtnClick}>확인</button>
                  <button>취소</button>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
