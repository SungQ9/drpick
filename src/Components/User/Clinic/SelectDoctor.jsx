import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import star from '../../../img/star-icon.png';
import back from '../../../img/back-arrow-icon.png';
import doctor from '../../../img/doctor-icon.png';

const SelectDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectSubject = location.state ? location.state.subject : null;

  const doctorHandler = (doctor) => {
    console.log('Selected subject:', doctor);
    navigate(`/clinic/detail/`, { state: { doctor } });
  };

  return (
    <div className='selectDoctorWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>{selectSubject}</h1>
      </div>
      <div className='doctorList'>
        <ul>
          <li className='doctor' onClick={() => doctorHandler('백의사')}>
            <div className='content'>
              <div className='name'>
                <h2>백의사</h2>
                <span>밝은이비인후과</span>
              </div>
              <div className='grade'>
                <img
                  src={star}
                  alt='star'
                  style={{ width: '25px', height: '25px' }}
                />{' '}
                <p>5.0</p> <span>(200+)</span>
              </div>
              <div className='status'>
                <h5>접수가능</h5>
                <span>(수) 15:00 ~ 20:00</span>
              </div>
              <div className='major'>
                <p>내과전문의</p>
                <p>영상진료</p>
              </div>
            </div>
            <img src={doctor} alt='doctor' />
          </li>
          <li className='doctor' onClick={() => doctorHandler('림의사')}>
            <div className='content'>
              <div className='name'>
                <h2>림의사</h2>
                <span>하림병원</span>
              </div>
              <div className='grade'>
                <img
                  src={star}
                  alt='star'
                  style={{ width: '25px', height: '25px' }}
                />{' '}
                <p>5.0</p> <span>(200+)</span>
              </div>
              <div className='status'>
                <h5>접수가능</h5>
                <span>(수) 15:00 ~ 20:00</span>
              </div>
              <div className='major'>
                <p>내과전문의</p>
                <p>영상진료</p>
              </div>
            </div>
            <img src={doctor} alt='doctor' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectDoctor;
