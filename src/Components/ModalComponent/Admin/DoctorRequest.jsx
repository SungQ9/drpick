// 의사 등록요청 상세보기에서 증명파일 띄우는 모달
import React from 'react';

const DoctorRequest = ({ filePath  }) => {
  return (
    <div>
      <h2>
        <img src={filePath} alt="증명파일"/>
      </h2>
    </div>
  );
};
export default DoctorRequest;
