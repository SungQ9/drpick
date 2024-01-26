import React, { useState, useRef } from 'react';
import '../../css/Style.css';
import '../../css/UserStyle.css';
import Input from '../Layout/Input';
import Select from '../Layout/Select';
import { useTokenContext } from '../Context/TokenContext';
import axios from 'axios';

const InquiryModal = ({ onClose, item = {} }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [title, setTitle] = useState('');
  const { token, userEmail } = useTokenContext();
  const name = userEmail;
  const commentsRef = useRef(null);
  const formData = new FormData();

  const handleSelectChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedValue(selectedOption.value);
    setSelectedLabel(selectedOption.label);
  };

  const handleFileBtnClick = () => {
    const fileInput = document.getElementById('selectedFile');
    if (fileInput) {
      fileInput.click();
    }
  };

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

    // formData에서 삭제
    formData.delete(`fileList[${index}]`);
  };

  // 파일다중선택 return
  const renderFileList = () => {
    if (!Array.isArray(selectedFileName)) {
      return null;
    }

    return selectedFileName.map((file, index) => (
      <p
        className='uploadFileList'
        key={index} // 수정: file.id가 아니라 index를 사용
        style={{ width: '100px', margin: '0px' }}
      >
        <span
          style={{
            fontSize: '12px',
            marginRight: '5px',
            width: '100px',
            height: '20px',
          }}
        >
          {file.name}
        </span>
        <p onClick={() => handleDeleteFile(index)}>X</p>
      </p>
    ));
  };

  // 제목 설정
  const handleTitleInputChange = (event) => {
    const target = event.target.value;
    setTitle(target);
  };
  // 문의 등록
  const registerInquiry = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const comments = commentsRef.current
      ? commentsRef.current.value
      : commentsRef.current;

    formData.append('inquiryType', selectedValue);
    formData.append('inquiryWriterEmail', userEmail);
    formData.append('inquiryTitle', title);
    formData.append('inquiryComments', comments);

    // 파일 존재 시 등록
    if (selectedFileName.length > 0) {
      selectedFileName.forEach((file) => {
        formData.append('fileList', file);
      });
    }

    // axios 요청 전에 FormData 확인
    console.log('FormData before axios request:', formData);

    try {
      const res = await axios.post(
        'http://localhost:8080/inquiry/registInquiry',
        formData,
        config,
      );
      console.log(res.data);
      const message = res.data.body.message;
      alert(message);
      onClose();
    } catch (error) {
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
        }
      } else if (error.request) {
        // 서버로의 요청이 실패했을 경우
        console.error('서버에 요청을 보내는 중 오류가 발생했습니다.');
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
        console.error('오류를 설정하는 중에 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <div className='modal-inquiry'>
        <div id='signUpInputForm'>
          <table
            className='modal-inquiry-table'
            style={{
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '600px',
            }}
          >
            <tbody>
              <tr>
                <td>
                  <Input
                    id={'inquiryType'}
                    className={'inquiryType'}
                    type={'text'}
                    label={'문의유형'}
                    value={selectedLabel}
                    readOnly={'readOnly'}
                  />
                </td>
                <td>
                  <Select
                    id={'inquiryType'}
                    options={[
                      { value: 'Q', label: '이용문의' },
                      { value: 'C', label: '진료문의' },
                      { value: 'P', label: '결제문의' },
                      { value: 'D', label: '배송문의' },
                      { value: '', label: '선택해주세요' },
                    ]}
                    onChange={handleSelectChange}
                    value={selectedValue}
                  />
                </td>
              </tr>
              <tr style={{ display: 'flex' }}>
                <td colSpan={2}>
                  <Input
                    id={'inquiryTitle'}
                    className={'inquiryTitle'}
                    type={'text'}
                    label={'제목'}
                    style={{ width: '525px' }}
                    value={title}
                    onChange={handleTitleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id={'inquiryWriter'}
                    className={'inquiryWriter'}
                    type={'text'}
                    label={'이메일'}
                    style={{ width: '525px' }}
                    value={name}
                    disabled={'disabled'}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <h3 style={{ color: '#11c2ad', margin: '0px 5px 5px 20px' }}>
                    내용
                  </h3>
                  <p
                    style={{
                      border: '1px solid #cecece',
                      borderRadius: '10px',
                      width: '525px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0px',
                    }}
                  >
                    <textarea
                      id='comments' // 수정: id 속성 추가
                      style={{
                        width: '99%',
                        height: '96%',
                        resize: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '5px 0px 0px 5px',
                      }}
                      ref={commentsRef}
                    ></textarea>
                  </p>
                </td>
              </tr>
              <tr style={{ display: 'flex' }}>
                <td
                  style={{ width: '100px', marginRight: '0px', padding: '0px' }}
                >
                  <input
                    type='button'
                    id='fileBtn'
                    style={{ background: '#DAF6EE', color: '#11c2ad' }}
                    onClick={handleFileBtnClick}
                    value='파일업로드'
                  />
                  <input
                    type='file'
                    id='selectedFile'
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={handleFileInputChange}
                    multiple
                  />
                </td>
                <td style={{ display: 'flex', width: '400px' }}>
                  {renderFileList()}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginBottom: '25px' }}>
            <button
              className='clinicSubBtn-mid'
              style={{ background: '#11c2ad' }}
              onClick={registerInquiry}
            >
              확인
            </button>
            <button className='clinicSubBtn-mid' onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
