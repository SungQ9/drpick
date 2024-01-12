import React from 'react';

const FileUpload = ({
  handleFileBtnClick,
  handleFileInputChange,
  renderFileList,
}) => {
  return (
    <div className='uploadFileListContainer'>
      {renderFileList()}
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
    </div>
  );
};

export default FileUpload;
