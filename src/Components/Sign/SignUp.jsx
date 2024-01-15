import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../Layout/Input';
import Select from '../Layout/Select';

import '../../css/UserStyle.css';
import '../../css/Style.css';

const SignUp = () => {
  const navigate = useNavigate();
  const getElementValue = (id) => document.getElementById(id).value;
  const getCheckedValue = (className) =>
    document.querySelector(`.${className}:checked`).value;

  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  // 이메일 도메인 핸들러
  const handleSelectChange = (value) => {
    setSelectedOption(value);
    console.log(value);
  };

  // 파일 업로드 핸들러
  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const newFiles = Array.from(fileInput.files).map((file) => ({
      name: file.name,
      id: Date.now(),
    }));
    const totalFiles = selectedFileName.length + newFiles.length;

    if (totalFiles > 3) {
      alert('파일은 3개까지 올릴 수 있습니다.');
      return;
    }

    setSelectedFileName((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // 업로드 파일 삭제 핸들러
  const handleDeleteFile = (id) => {
    setSelectedFileName((prevFiles) =>
      prevFiles.filter((file) => file.id !== id),
    );
  };

  // 업로드 버튼 핸들러
  const handleFileBtnClick = () => {
    document.getElementById('selectedFile').click();
  };

  // 파일다중선택 return
  const renderFileList = () => {
    // selectedFileName이 배열인지 확인
    if (!Array.isArray(selectedFileName)) {
      // console.error('selectedFileName is not an array.');
      return null; // 또는 다른 적절한 처리를 추가하세요.
    }

    return selectedFileName.map((file) => (
      <p className='uploadFileList' key={file.id}>
        <span style={{ marginRight: '5px' }}>{file.name}</span>
        <p onClick={() => handleDeleteFile(file.id)}>X</p>
      </p>
    ));
  };

  // submit
  const submitBtnClick = (event) => {
    console.log('확인버튼클릭');
    // 폼의 기본 동작 방지 (페이지 새로고침 방지)
    event.preventDefault();

    const email = document.getElementById('email').value;
    const domain = document.getElementById('email_domain').value;
    // 이메일과 도메인을 조합한 회원 이메일 생성
    const memberEmail = domain === '' ? email : email + domain;
    const name = getElementValue('name');
    const birth = getElementValue('birth');
    const sex = getCheckedValue('sex');
    const tel = getElementValue('tel');
    const pwd = getElementValue('pwd');
    const addrMain = getElementValue('addr_main');
    const addrDetail = getElementValue('addr_detail');
    const auth = getCheckedValue('auth');

    // Null Check
    // if (
    //   [
    //     name,
    //     birth,
    //     sex,
    //     email,
    //     domain,
    //     tel,
    //     pwd,
    //     addrMain,
    //     addrDetail,
    //     auth,
    //   ].some((value) => !value)
    // ) {
    //   // console.error('하나 이상의 요소를 찾을 수 없습니다.');
    //   return;
    // }

    // FormData 객체 생성
    const formData = new FormData();

    // 회원 정보를 FormData에 직접 추가
    formData.append('userEmail', memberEmail);
    formData.append('userPwd', pwd);
    formData.append('userName', name);
    formData.append('userBirth', birth);
    formData.append('userSex', sex);
    formData.append('userTel', tel);
    formData.append('userAddrMain', addrMain);
    formData.append('userAddrDetail', addrDetail);
    formData.append('userAuth', auth);

    // 선택된 파일이 있으면 FormData에 추가
    const selectedFileInput = document.getElementById('selectedFile');
    if (selectedFileInput && selectedFileInput.files.length > 0) {
      Array.from(selectedFileInput.files).forEach((file) => {
        formData.append('fileList', file);
      });
    }
    // 회원가입 요청을 서버에 전송
    axios
      .post('http://localhost:8080/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8', // 이 부분이 중요합니다.
        },
      })
      .then((res) => {
        // 성공적으로 응답 받았을 때의 처리
        console.log(res.data);
        const message = res.data.body.message;
        alert(message);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          // 서버 응답이 있을 경우
          if (error.response.data && error.response.data.error) {
            // 서버에서 에러 응답을 보냈을 때
            const details = error.response.data.details;
            const errorMessages = Object.values(details).join('\n');
            alert(`유효성 검증 오류:\n${errorMessages}`);
          } else {
            // 기타 서버 응답 오류 처리
            const errorMessage =
              error.response.data.body.message || '서버 응답 오류';
            alert(`${errorMessage}`);
            navigate('/login');
          }
        } else if (error.request) {
          // 서버로의 요청이 실패했을 경우
          console.error('서버에 요청을 보내는 중 오류가 발생했습니다.');
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
          console.error('오류를 설정하는 중에 문제가 발생했습니다.');
        }
      });
  };
  return (
    <div className='mainContainer'>
      <div id='signUpForm' className='signUpForm'>
        <div id='signUpWrapper' className='signUpWrapper'>
          <h4>
            회원가입<span>회원가입</span>
          </h4>
          <div id='signUpInputForm' className='signUpInputForm'>
            <table id='signUpTable' className='signUpTable'>
              <tr>
                <td colSpan={2}>
                  <Input
                    id='name'
                    className='member_name'
                    label='이름'
                    type='text'
                    placeholder='이름을 입력하세요'
                    style={{ width: '500px' }}
                    value={selectedName.trim()}
                    onChange={(e) => setSelectedName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    id='birth'
                    className='member_birth'
                    label='생년월일'
                    type='text'
                    placeholder='　생년월일 8자리를 입력해주세요 ( 년도/월/일 )'
                    minLength={8}
                    maxLength={8}
                  />
                </td>
                <td>
                  <input
                    type='radio'
                    className='sex'
                    id='sexM'
                    value='M'
                    name='sex'
                    defaultChecked
                  />
                  남자
                  <input
                    type='radio'
                    className='sex'
                    id='sexF'
                    value='F'
                    name='sex'
                  />
                  여자
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    id='email'
                    className='member_email'
                    label='이메일'
                    type='text'
                    placeholder='　이메일형식'
                  />
                </td>
                <td>
                  <Select
                    id='email_domain'
                    options={[
                      { value: '@naver.com', label: '@naver.com' },
                      { value: '@daum.net', label: '@daum.net' },
                      { value: '@google.com', label: '@google.com' },
                      { value: '', label: '직접입력' },
                    ]}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    value={selectedOption} // selectedOption은 적절한 상태로 변경 필요
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    id='accessNumber'
                    className='accessNumber'
                    label='인증번호'
                    type='text'
                    placeholder='　인증번호를 입력하세요'
                  />
                </td>
                <td>
                  <button id='emailBtn'>인증받기</button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id='tel'
                    className='member_tel'
                    label='전화번호'
                    type='text'
                    style={{ width: '500px' }}
                    placeholder="　'-' 없이 입력하세요"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id='pwd'
                    className='member_pwd'
                    label='비밀번호'
                    type='password'
                    style={{ width: '500px' }}
                    placeholder='　영어,숫자,특수문자를 포함한 8~20자 '
                    minLength={8}
                    maxLength={20}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id='ckpwd'
                    className='member_ckpwd'
                    label='비밀번호확인'
                    type='password'
                    style={{ width: '500px', fontSize: '12px' }}
                    minLength={8}
                    maxLength={20}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Input
                    id='addr_main'
                    className='member_addr_main'
                    type='text'
                    label='주소'
                    placeholder='　주소를 입력해주세요'
                  />
                </td>
                <td>
                  <button id='addrBtn'>주소검색</button>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id='addr_detail'
                    className='member_addr_detail'
                    type='text'
                    label='상세주소'
                    style={{ width: '500px', fontSize: '11px' }}
                    placeholder='　나머지 주소를 입력해주세요'
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <span id='partnerShipSpan'>
                    <label id='partnerShip'>회원유형</label>
                  </span>
                  <input
                    type='radio'
                    className='auth'
                    id='authN'
                    value='N'
                    name='auth'
                    defaultChecked
                  />
                  일반
                  <input
                    type='radio'
                    className='auth'
                    id='authD'
                    value='D'
                    name='auth'
                  />
                  의사
                  <input
                    type='radio'
                    className='auth'
                    id='authS'
                    value='S'
                    name='auth'
                  />
                  약국
                </td>
              </tr>
              <tr>
                <td className='uploadFileListTd'>
                  <span id='partnerShipSpan'>
                    <label id='partnerShip'>증명파일</label>
                  </span>
                  <div className='uploadFileListContainer'>
                    {renderFileList()}
                  </div>
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
                  <button className='signUpBtn' onClick={submitBtnClick}>
                    확인
                  </button>
                  <button
                    className='signUpBtn'
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    취소
                  </button>
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
