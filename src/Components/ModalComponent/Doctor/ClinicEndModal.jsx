import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';
import Input from '../../Layout/Input';

const ClinicEndModal = ({ onClose, item = [], type, fetchData }) => {
  const [clinicAmount, setClinicAmount] = useState('');
  const [certificateFileName, setCertificateFileName] = useState([]);
  const [prescriptionFileName, setPrescriptionFileName] = useState([]);
  const showAlert = useAlert();
  const formData = new FormData();

  const handleClinicAmountChange = (event) => {
    // 진료비 입력값이 변경될 때 상태 업데이트
    setClinicAmount(event.target.value);
  };

  const certificateFileInputChange = (event) => {
    const fileInput = event.target;
    const newFiles = Array.from(fileInput.files);

    if (newFiles.length > 1) {
      alert('파일은 1개만 올릴 수 있습니다.');
      return;
    }

    setCertificateFileName(newFiles);
    formData.append('fileList1', newFiles[0]); // 서버에서 파일 구분을 위한 키를 'fileList1'로 사용
  };

  const prescriptionFileInputChange = (event) => {
    const fileInput = event.target;
    const newFiles = Array.from(fileInput.files);

    if (newFiles.length > 1) {
      alert('파일은 1개만 올릴 수 있습니다.');
      return;
    }

    setPrescriptionFileName(newFiles);
    formData.append('fileList2', newFiles[0]); // 서버에서 파일 구분을 위한 키를 'fileList2'로 사용
  };

  const certificateDeleteFile = () => {
    setCertificateFileName([]);
    formData.delete('fileList1'); // 'fileList1' 키를 가진 파일 삭제
  };

  const prescriptionDeleteFile = () => {
    setPrescriptionFileName([]);
    formData.delete('fileList2'); // 'fileList2' 키를 가진 파일 삭제
  };

  const certificateFileBtnClick = () => {
    const fileInput = document.getElementById('certificate-file');
    if (fileInput) {
      fileInput.click();
    }
  };

  const prescriptionFileBtnClick = () => {
    const fileInput = document.getElementById('prescription-file');
    if (fileInput) {
      fileInput.click();
    }
  };

  const certificateFileList = () => {
    if (certificateFileName.length === 0) {
      return null;
    }

    return (
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginLeft: '10px' }}>
          {certificateFileName[0].name}
        </span>
        <p
          onClick={certificateDeleteFile}
          style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
        >
          X
        </p>
      </p>
    );
  };

  const prescriptionFileList = () => {
    if (prescriptionFileName.length === 0) {
      return null;
    }

    return (
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginLeft: '10px' }}>
          {prescriptionFileName[0].name}
        </span>
        <p
          onClick={prescriptionDeleteFile}
          style={{ cursor: 'pointer', marginLeft: '5px', color: 'red' }}
        >
          X
        </p>
      </p>
    );
  };

  const handleSubmit = async () => {
    try {
      // 클리닉 비용과 파일 데이터를 formData에 추가
      formData.append('clinicAmount', clinicAmount);

      if (certificateFileName.length > 0) {
        formData.append('certificateFile', certificateFileName[0]);
      }

      if (prescriptionFileName.length > 0) {
        formData.append('prescriptionFile', prescriptionFileName[0]);
      }

      console.log('전송하는데이터', formData);
      // 서버로 데이터 전송
      const response = await axios.post(
        'http://localhost:8080/123123123123',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 설정
          },
        },
      );

      // 서버 응답에 따른 처리
      if (response.status === 200) {
        showAlert('성공', '데이터 전송 성공', 'success').then(
          fetchData(),
          onClose(),
        );
        // 서버 응답에 따른 처리를 추가할 수 있습니다.
      } else {
        showAlert('요청실패', '데이터 전송 실패', 'error');
      }

      // 저장 후 모달 닫기 또는 다른 작업 수행
    } catch (error) {
      showAlert('요청실패', '데이터 전송 실패', 'error');
      console.error('데이터 전송 오류:', error);
    }
  };

  return (
    <div
      style={{
        width: '550px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className='upload-form'
        style={{
          width: '500px',
          height: '300px',
          background: '#DAF6EE',
          borderRadius: '15px',
          margin: '10px',
        }}
      >
        <div
          className='upload-wrapper'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '20px',
            marginTop: '20px',
          }}
        >
          <div>
            진료비　
            <input
              id='clinic-amount'
              placeholder='진료비를 입력해주세요'
              value={clinicAmount}
              onChange={handleClinicAmountChange}
            />
          </div>
          <div
            className='certificate-file'
            style={{ display: 'flex', height: '85px' }}
          >
            {' '}
            <input
              type='button'
              id='fileBtn'
              onClick={certificateFileBtnClick}
              value='진단서'
            />
            <input
              type='file'
              id='certificate-file'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={certificateFileInputChange}
            />
            {certificateFileList()}
          </div>
          <div
            className='prescription-file'
            style={{ display: 'flex', height: '85px' }}
          >
            {' '}
            <input
              type='button'
              id='fileBtn'
              onClick={prescriptionFileBtnClick}
              value='처방전'
            />
            <input
              type='file'
              id='prescription-file'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={prescriptionFileInputChange}
            />
            {prescriptionFileList()}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '350px',
        }}
      >
        <button
          className='clinicSubBtn-mid'
          style={{ background: '#11C2AD' }}
          onClick={handleSubmit}
        >
          저장
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ClinicEndModal;
