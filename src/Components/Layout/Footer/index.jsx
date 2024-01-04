import React from 'react';
import '../../../css/Style.css';

const Footer = () => {
  return (
    <div className='footerContainer'>
      <div className='textContainer'>
        <span>(주)닥터픽</span>
        <br />
        <span>
          {' '}
          대표 정하림 | 사업자 등록 번호 : 123-45-678910 | 통신판매업 신고번호 :
          2024-서울마포-1234
        </span>
        <br />
        <span>
          주소 : 서울특별시 마포구 백범로23, 거구장 3층 | 사업자 정보 확인
        </span>
        <br />
        <br />
        <span>Copyright 2024 닥터픽 Inc All rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
