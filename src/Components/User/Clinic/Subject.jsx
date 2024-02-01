import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
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

const Subject = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();

  const subjectHandler = (subject) => {
    clinicContext.setClinicState((prevState) => ({
      ...prevState,
      selectSubject: subject,
    }));
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
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('가정의학과')}>가정의학과</h2>
              <span>건강증진,질병예방,만성질환</span>
            </div>
            <img
              src={hospital}
              alt='hospital'
              onClick={() => subjectHandler('가정의학과')}
            />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('내과')}>내과</h2>
              <span>감기,소화기,호흡기 등</span>
            </div>
            <img src={lung} alt='lung' onClick={() => subjectHandler('내과')} />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('산부인과')}>산부인과</h2>
              <span>여성질환, 피임상담 등</span>
            </div>
            <img
              src={uterus}
              alt='uterus'
              onClick={() => subjectHandler('산부인과')}
            />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('성형외과')}>성형외과</h2>
              <span>피부질환, 화상, 상처 등</span>
            </div>
            <img
              src={cosmetic}
              alt='cosmetic'
              onClick={() => subjectHandler('성형외과')}
            />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('신경과')}>신경과</h2>
              <span>두통,어지럼증,뇌졸증 등</span>
            </div>
            <img
              src={headache}
              alt='headache'
              onClick={() => subjectHandler('신경과')}
            />
          </li>
          <li>
            <div className='content' onClick={() => subjectHandler('안과')}>
              <h2 onClick={() => subjectHandler('안과')}>안과</h2>
              <span>눈 피로,결막염,다래끼 등</span>
            </div>
            <img src={eye} alt='eye' onClick={() => subjectHandler('안과')} />
          </li>

          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('치과')}>치과</h2>
              <span>스케일링,충치,치아교정</span>
            </div>
            <img
              src={tooth}
              alt='tooth'
              onClick={() => subjectHandler('치과')}
            />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('이비인후과')}>이비인후과</h2>
              <span>중이염,난청,귀 통증</span>
            </div>
            <img
              src={ear}
              alt='ear'
              onClick={() => subjectHandler('이비인후과')}
            />
          </li>
          <li>
            <div className='content'>
              <h2 onClick={() => subjectHandler('소아과')}>소아과</h2>
              <span>소아 알레르기,소아 호흡기 질환</span>
            </div>
            <img
              src={baby}
              alt='baby'
              onClick={() => subjectHandler('소아과')}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subject;
