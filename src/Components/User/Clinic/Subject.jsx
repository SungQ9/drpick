import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';
import hospital from '../../../img/subject-hospital-icon.png';
import tooth from '../../../img/subject-tooth-icon.png';
import ear from '../../../img/subject-ear-icon.png';
import baby from '../../../img/subject-baby-icon.png';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const Subject = () => {
  const navigate = useNavigate();

  const subjectHandler = (subject) => {
    console.log('Selected subject:', subject);
    navigate(`/clinic/doctor/`, subject);
  };

  return (
    <div className='subjectWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>진료과목선택</h1>
      </div>
      <div className='subjectList'>
        <ul>
          <li onClick={() => subjectHandler('가정의학과')}>
            <div className='content'>
              <h2>가정의학과</h2>
              <span>건강증진,질병예방,만성질환</span>
            </div>
            <img src={hospital} alt='hospital' />
          </li>
          <li onClick={() => subjectHandler('치과')}>
            <div className='content'>
              <h2>치과</h2>
              <span>스케일링,충치,치아교정</span>
            </div>
            <img src={tooth} alt='tooth' />
          </li>
          <li onClick={() => subjectHandler('이비인후과')}>
            <div className='content'>
              <h2>이비인후과</h2>
              <span>중이염,난청,귀 통증</span>
            </div>
            <img src={ear} alt='ear' />
          </li>
          <li onClick={() => subjectHandler('소아과')}>
            <div className='content'>
              <h2>소아과</h2>
              <span>소아 알레르기,소아 호흡기 질환</span>
            </div>
            <img src={baby} alt='baby' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subject;
