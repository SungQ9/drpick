import React from 'react';
import { useNavigate } from 'react-router-dom';
import SymptomCategory from './SymptomCategory';
import back from '../../../img/back-arrow-icon.png';
import mask from '../../../img/symptom-mask-icon.png';
import eye from '../../../img/symptom-eye-icon.png';
import uterus from '../../../img/symptom-uterus-icon.png';

import ointment from '../../../img/symptom-ointment-icon.png';
import headache from '../../../img/symptom-headache-icon.png';
import toothache from '../../../img/symptom-toothache-icon.png';
import baby from '../../../img/symptom-baby-icon.png';
import symptomData from '../../SampleData/symptomData';

const Symptom = () => {
  const navigate = useNavigate();
  const images = [mask, eye, uterus, ointment, headache, toothache, baby];

  const subjectHandler = (subject) => {
    console.log('Selected Symptom subject:', subject);
    navigate(`/clinic/doctor/`, { state: { subject } });
  };

  return (
    <div className='symptomWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>증상선택</h1>
      </div>
      <div className='symptomList'>
        <ul>
          {symptomData.map((category, index) => (
            <SymptomCategory
              key={index}
              title={category.title}
              items={category.items}
              img={images[index % images.length]}
              subject={category.subject[0]}
              onSelect={subjectHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Symptom;
