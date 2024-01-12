import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminTab() {
  const navigate = useNavigate();

  const [doctorSubtabVisible, setDoctorSubtabVisible] = useState(false);
  const [inquirySubtabVisible, setInquirySubtabVisible] = useState(false);

  const handleDoctorSubtab = () => {
    setDoctorSubtabVisible(!doctorSubtabVisible);
    setInquirySubtabVisible(false);
  };
  const handleButtonDoctorClick = (component) => {
    navigate('/admin/doctor', { state: { selectedComponent: component } });
  };

  const handleInquirySubtab = () => {
    setInquirySubtabVisible(!inquirySubtabVisible);
    setDoctorSubtabVisible(false);
  };

  const handleButtonInquiryClick = (type) => {
    navigate('/admin/inquiry', { state: { selectedType: type } });
  };

  return (
    <div id='#AdminTab'>
      <ul className='tabUi' style={{ marginLeft: '5%' }}>
        <li
          className='tabLi'
          style={{ marginRight: '0px' }}
          onClick={() => {
            navigate('/');
          }}
        >
          {' '}
          <img src='' alt='' />
          대시보드
        </li>
        <li
          className='tabLi'
          style={{ marginRight: '0px' }}
          onClick={() => {
            navigate('/admin/user');
          }}
        >
          <img src='' alt='' />
          회원관리
        </li>
        <li
          style={{ marginRight: '0px' }}
          className={`tabLi ${doctorSubtabVisible ? 'clicked' : ''}`}
          onClick={handleDoctorSubtab}
        >
          <img src='' alt='' />
          의사관리
          {doctorSubtabVisible && (
            <ul className='subtabUi' style={{ right: '35%' }}>
              <li
                style={{ marginRight: '0px' }}
                className='subtabLi'
                onClick={() => {
                  handleButtonDoctorClick('doctor');
                }}
              >
                의사관리
              </li>
              <li
                className='subtabLi'
                onClick={() => {
                  handleButtonDoctorClick('request');
                }}
              >
                등록요청목록
              </li>
            </ul>
          )}
        </li>
        <li
          style={{ marginRight: '0px' }}
          className='tabLi'
          onClick={() => {
            navigate('/admin/hospital');
          }}
        >
          <img src='' alt='' />
          병원관리
        </li>
        <li
          style={{ marginRight: '0px' }}
          className='tabLi'
          onClick={() => {
            navigate('/admin/drugstore');
          }}
        >
          <img src='' alt='' />
          약국관리
        </li>
        <li
          style={{ marginRight: '0px' }}
          className={`tabLi ${inquirySubtabVisible ? 'clicked' : ''}`}
          onClick={handleInquirySubtab}
        >
          <img src='' alt='' />
          문의관리
          {inquirySubtabVisible && (
            <ul className='subtabUi' style={{ right: '35%' }}>
              <li
                className='subtabLi'
                onClick={() => {
                  handleButtonInquiryClick('user');
                }}
              >
                회원문의
              </li>
              <li
                className='subtabLi'
                onClick={() => {
                  handleButtonInquiryClick('doctor');
                }}
              >
                의사문의
              </li>
              <li
                className='subtabLi'
                onClick={() => {
                  handleButtonInquiryClick('drugstore');
                }}
              >
                약국문의
              </li>
            </ul>
          )}
        </li>
        <li
          className='tabLi'
          onClick={() => {
            navigate('/admin/statistics');
          }}
        >
          <img src='' alt='' />
          통계
        </li>
      </ul>
    </div>
  );
}

export default AdminTab;
