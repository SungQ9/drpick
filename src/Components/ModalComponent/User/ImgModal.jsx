import React from 'react';
// 진단서,처방전 이미지  모달
const ImgModal = ({ onClose, item = {} }) => {
  return (
    <div>
      <h4> 이미지가 들어올 위치 </h4>
      <img src='' alt='img' />
    </div>
  );
};

export default ImgModal;
