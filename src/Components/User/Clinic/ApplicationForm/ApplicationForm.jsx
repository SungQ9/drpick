// ApplicationForm
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../../Context/ClinicContext';
import back from '../../../../img/back-arrow-icon.png';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();

  const [selectedFileName, setSelectedFileName] = useState('');

  // 파일 업로드 핸들러
  const handleFileInputChange = (event) => {
    const fileInput = event.target;
    const newFiles = Array.from(fileInput.files);

    const totalFiles = selectedFileName.length + newFiles.length;

    if (totalFiles > 3) {
      alert('파일은 3개까지 올릴 수 있습니다.');
      return;
    }

    setSelectedFileName((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // 업로드 파일 삭제 핸들러
  const handleDeleteFile = (index) => {
    setSelectedFileName((prevFiles) =>
      prevFiles.filter((prevFile, i) => i !== index),
    );
  };

  // 업로드 버튼 핸들러
  const handleFileBtnClick = () => {
    const fileInput = document.getElementById('selectedFile');
    if (fileInput) {
      fileInput.click();
    }
  }

  // 파일다중선택 return
  const renderFileList = () => {
    if (!Array.isArray(selectedFileName)) {
      return null
    }

    return selectedFileName.map((file, index) => (
      <p className='uploadFileList' key={index}>
        <span style={{ marginRight: '5px' }}>{file.name}</span>
        <p id='fileX' onClick={() => handleDeleteFile(index)}> X </p>
      </p>
    ));
  };

  // 입력받은 주민등록번호 뒷자리 contex에 저장
  const handleResiNumChange = (evt) => {
    clinicContext.setClinicState((prev) => ({
      ...prev,
      writeResidentNumber: evt.target.value,
    }));
  };

  // 입력받은 증상 contex에 저장
  const handleSymptomChange = (evt) => {
    clinicContext.setClinicState((prev) => ({
      ...prev,
      writeSymptom: evt.target.value,
    }));
  };

  const handleNextBtn = () => {
    clinicContext.setClinicState((prev) => ({
      ...prev,
      uploadedFiles: selectedFileName,
    }));
    navigate('/clinic/payment');
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
        {/* <div className='residentNumber'>
          <h4>주민등록번호 뒷자리를 입력해주세요</h4>
          <input type='text' value={'991122'} readOnly /> -{' '}
          <input
            type='text'
            onChange={handleResiNumChange}
            minLength={7}
            maxLength={7}
          />
        </div> */}
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
              multiple
            />
            {renderFileList()}
          </div>
        </div>
        <button className='clinicBtn-long' onClick={handleNextBtn}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
