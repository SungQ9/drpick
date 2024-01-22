import React, { useState } from 'react';
import '../../css/Style.css';
import '../../css/UserStyle.css';
import Input from '../Layout/Input';
import Select from '../Layout/Select';

const InquiryModal = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const name = localStorage.getItem('userName');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFileBtnClick = () => {
    document.getElementById('selectedFile').click();
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

  // 파일다중선택 return
  const renderFileList = () => {
    // selectedFileName이 배열인지 확인
    if (!Array.isArray(selectedFileName)) {
      // console.error('selectedFileName is not an array.');
      return null; // 또는 다른 적절한 처리를 추가하세요.
    }

    return selectedFileName.map((file) => (
      <p
        className='uploadFileList'
        key={file.id}
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
        <p onClick={() => handleDeleteFile(file.id)}>X</p>
      </p>
    ));
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
                    value={selectedValue}
                    readOnly={'readOnly'}
                  />
                </td>
                <td>
                  <Select
                    id={'inquiryType'}
                    options={[
                      { value: '이용문의', label: '이용문의' },
                      { value: '진료문의', label: '진료문의' },
                      { value: '결제문의', label: '결제문의' },
                      { value: '배송문의', label: '배송문의' },
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
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Input
                    id={'inquiryWriter'}
                    className={'inquiryWriter'}
                    type={'text'}
                    label={'이름'}
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
                      style={{
                        width: '99%',
                        height: '96%',
                        resize: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '5px 0px 0px 5px',
                      }}
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
