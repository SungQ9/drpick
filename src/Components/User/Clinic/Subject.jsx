import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';
import hospital from '../../../img/subject-hospital-icon.png';
import tooth from '../../../img/subject-tooth-icon.png';
import ear from '../../../img/subject-ear-icon.png';
import baby from '../../../img/subject-baby-icon.png';
import lung from '../../../img/subject-lung-icon.png';
import uterus from '../../../img/subject-uterus-icon.png';
import cosmetic from '../../../img/subject-cosmetic-icon.png';
import headache from '../../../img/subject-headache-icon.png';
import eye from '../../../img/subject-eye-icon.png';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const Subject = () => {
  const navigate = useNavigate();

  const subjectHandler = (subject) => {
    console.log('Selected subject:', subject);
    navigate(`/clinic/doctor/`, { state: { subject } });
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
          <li onClick={() => subjectHandler('내과')}>
            <div className='content'>
              <h2>내과</h2>
              <span>감기,소화기,호흡기 등</span>
            </div>
            <img src={lung} alt='lung' />
          </li>
          <li onClick={() => subjectHandler('산부인과')}>
            <div className='content'>
              <h2>산부인과</h2>
              <span>여성질환, 피임상담 등</span>
            </div>
            <img src={uterus} alt='uterus' />
          </li>
          <li onClick={() => subjectHandler('성형외과')}>
            <div className='content'>
              <h2>성형외과</h2>
              <span>피부질환, 화상, 상처 등</span>
            </div>
            <img src={cosmetic} alt='cosmetic' />
          </li>
          <li onClick={() => subjectHandler('신경과')}>
            <div className='content'>
              <h2>신경과</h2>
              <span>두통,어지럼증,뇌졸증 등</span>
            </div>
            <img src={headache} alt='headache' />
          </li>
          <li onClick={() => subjectHandler('안과')}>
            <div className='content'>
              <h2>안과</h2>
              <span>눈 피로,결막염,다래끼 등</span>
            </div>
            <img src={eye} alt='eye' />
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
