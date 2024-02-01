import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';
import Input from '../../Layout/Input';

const ClinicEndModal = ({ onClose, item = [], type, fetchData }) => {
  const [certificateFileName, setCertificateFileName] = useState([]);
  const [prescriptionFileName, setPrescriptionFileName] = useState([]);
  const formData = new FormData();

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
      <p>
        <span>{certificateFileName[0].name}</span>
        <button onClick={certificateDeleteFile}>X</button>
      </p>
    );
  };

  const prescriptionFileList = () => {
    if (prescriptionFileName.length === 0) {
      return null;
    }

    return (
      <p>
        <span>{prescriptionFileName[0].name}</span>
        <button onClick={prescriptionDeleteFile}>X</button>
      </p>
    );
  };

  return (
    <div
      style={{
        width: '550px',
        height: '550px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className='upload-form'
        style={{
          width: '500px',
          height: '500px',
          background: '#DAF6EE',
          borderRadius: '15px',
          margin: '10px',
        }}
      >
        <div>
          진료비　
          <input placeholder='진료비를 입력해주세요' />
        </div>
        <div className='certificate-file' style={{ display: 'flex' }}>
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
        <div className='prescription-file' style={{ display: 'flex' }}>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '350px',
        }}
      >
        <button className='clinicSubBtn-mid' style={{ background: '#11C2AD' }}>
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
