import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';
import back from '../../../img/back-arrow-icon.png';
import doctor from '../../../img/doctor-icon.png';
import star from '../../../img/star-icon.png';

const DoctorDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectDoctor = location.state ? location.state.doctor : null;

  const doctorHandler = (doctor) => {
    console.log('Selected subject:', doctor);
    navigate(`/clinic/accept/`, { state: { doctor } });
  };

  return (
    <div className='doctorDetailWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>{selectDoctor}</h1>
      </div>
      <div className='doctorList'>
        <ul>
          <li className='doctor' style={{ borderBottom: 'none' }}>
            <div className='content'>
              <div className='name'>
                <h2>{selectDoctor}</h2>
                <span>밝은이비인후과</span>
              </div>
              <div
                className='major'
                style={{ marginTop: '0px', marginBottom: '-15px' }}
              >
                <p>내과전문의</p>
                <p>영상진료</p>
              </div>
              <div
                className='status'
                style={{ fontSize: '20px', height: '100px' }}
              >
                <h5>접수가능</h5>
                <span>(수) 15:00 ~ 20:00</span>
              </div>
            </div>
            <img src={doctor} alt='doctor' />
          </li>
        </ul>
      </div>
      <div className='doctorDetail'>
        <ul>
          <li className='review'>
            {' '}
            <div className='grade'>
              <div className='reviewStat'>
                <img
                  src={star}
                  alt='star'
                  style={{ width: '25px', height: '25px' }}
                />{' '}
                <p>5.0</p> <span>(200+)</span>
              </div>
              <div className='reviewText'>후기 100+개</div>
            </div>
            <div>
              <p>친절하게 알려주셨어요</p>
            </div>
            <div>
              <p>꼼꼼하게 진단해주셨어요</p>
            </div>
            <div>
              <p>정확하게 처방해주셨어요</p>
            </div>
          </li>
          <li className='introduction'>
            <textarea
              readOnly
              value='안녕하세요 반갑습니다 의사 소개입니다 잘부탁드립니다'
            ></textarea>
          </li>
        </ul>
      </div>
      <button
        className='clinicBtn-mid'
        onClick={() => {
          doctorHandler(selectDoctor);
        }}
      >
        접수하기
      </button>
      <button
        className='clinicBtn-mid'
        style={{ background: '#AECCC8' }}
        onClick={() => {
          alert('02-0000-1234');
        }}
      >
        전화문의
      </button>
    </div>
  );
};

export default DoctorDetail;
