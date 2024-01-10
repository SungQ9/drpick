import React, { useState } from 'react';
import '../../css/UserStyle.css';
import '../../css/Style.css';

import axios from 'axios';

const getElementValue = (id) => document.getElementById(id).value;
const getCheckedValue = (className) => document.querySelector(`.${className}:checked`).value;

const SignUp = () => {
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    setSelectedFileName(fileInput.files[0].name);
  };  

  const handleFileBtnClick = () => {
    document.getElementById('selectedFile').click();
  };

  const submitBtnClick = (event) => {
    event.preventDefault();

    const name = getElementValue('name');
    const birth = getElementValue('birth');
    const sex = getCheckedValue('sex');
    const email = getElementValue('email');
    const domain = getElementValue('email_domain');
    const member_email = email + domain;
    const tel = getElementValue('tel');
    const pwd = getElementValue('pwd');
    const addr_main = getElementValue('addr_main');
    const addr_detail = getElementValue('addr_detail');
    const auth = getCheckedValue('auth');

    // Null Check
    if ([name, birth, sex, email, domain, tel, pwd, addr_main, addr_detail, auth].some((value) => !value)) {
      console.error('하나 이상의 요소를 찾을 수 없습니다.');
      return;
    }

    // Request Data
    const formData = new FormData();

    formData.append("signupValue", JSON.stringify({
      userEmail: member_email,
      userPwd: pwd,
      userName: name,
      userBirth: birth,
      userSex: sex,
      userTel: tel,
      userAddrMain: addr_main,
      userAddrDetail: addr_detail,
      userAuth: auth
    }));
    
    const selectedFileInput = document.getElementById('selectedFile');
    if (selectedFileInput && selectedFileInput.files.length > 0) {
      formData.append('file', selectedFileInput.files[0]);
    }
    
    console.log(formData.get("signupValue"))
    console.log(formData.get("file"))

    axios.post('http://localhost:8080/users/signup', formData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.error('회원가입에러' + e.message);
    });
  };
   
  return (
    <div className='mainContainer'>
      <div className='signUpForm'>
        <div className='signUpWrapper'>
          <h4>
            회원가입<span>회원가입</span>
          </h4>
          <div 
            id="signUpInputForm"
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
                  <input type='radio' className='sex' id='sexM' value='M' name="sex" defaultChecked  />
                  남자
                  <input type='radio' className='sex' id='sexF' value='F' name="sex"/>
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
                  <select className='member_email_domain' id='email_domain'>
                    <option value='@naver.com'> @naver.com </option>
                    <option value='@daum.net'> @daum.net </option>
                    <option value='@google.com'> @google.com </option>
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
                    <label style={{ fontSize: '11px' }}>상세주소</label>
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span id='partnerShipSpan'>
                    <label id='partnerShip'>회원유형</label>
                    <td>
                      <input type='radio' className='auth' id='authN' value='N' name='auth' defaultChecked  />
                      일반
                      <input type='radio' className='auth' id='authD' value='D' name='auth' />
                      의사
                      <input type='radio' className='auth' id='authS' value='S' name='auth' />
                      약국
                    </td>
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
                    onClick={handleFileBtnClick}
                    value='파일업로드'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
