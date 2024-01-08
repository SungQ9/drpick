import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import back from '../../../img/back-arrow-icon.png';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();

  const [selectedFileName, setSelectedFileName] = useState('');

  // 파일업로드 버튼 변경하는 함수
  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    setSelectedFileName(fileInput.files[0].name);
  };

  const handleFileBtnClick = () => {
    document.getElementById('selectedFile').click();
  };
  // 입력받은 주민등록번호 뒷자리 contex에 저장
  const handleResiNumChange = (evt) => {
    clinicContext.wirteResidentNumber = evt.target.value;
    console.log(evt.value);
  };
  // 입력받은 증상  contex에 저장
  const handleSymptomChange = (evt) => {
    clinicContext.writeSymptom = evt.target.value;
    console.log(evt.value);
  };

  return (
    <div className='applicationFormWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>진료신청서</h1>
      </div>

      <div className='writeFormWrapper'>
        <div className='residentNumber'>
          <h4>주민등록번호 뒷자리를 입력해주세요</h4>
          <input type='text' value={'991122'} readOnly /> -{' '}
          <input
            type='text'
            onChange={handleResiNumChange}
            minLength={7}
            maxLength={7}
          />
        </div>
        <div className='writeSymptom'>
          <h4> 증상에 대해 알려주세요</h4>
          <textarea
            onChange={handleSymptomChange}
            placeholder='예) 열이나고 잔기침을 많이해요'
          ></textarea>
          <div className='fileBtn'>
            <input
              type='button'
              id='fileBtn'
              value='파일업로드'
              onClick={handleFileBtnClick}
              style={{ width: '150px', height: '50px', marginRight: '30px' }}
            />
            <input
              type='file'
              id='selectedFile'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={handleFileInputChange}
            />
            {selectedFileName}
          </div>
        </div>
        <button
          className='clinicBtn-long'
          onClick={() => {
            navigate('/clinic/payment');
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
