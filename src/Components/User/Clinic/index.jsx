import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import SelectClinicWay from './SelectcClinicWay';
import Subject from './Subject';
import Symptom from './Symptom';
import SelectDoctor from './SelectDoctor';
import DoctorDetail from './DoctorDetail';
import SelectAccept from './SelectAccept';

const Clinic = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<SelectClinicWay />} />
          <Route path='/subject' element={<Subject />} />
          <Route path='/symptom' element={<Symptom />} />
          <Route path='/doctor' element={<SelectDoctor />} />
          <Route path='/detail' element={<DoctorDetail />} />
          <Route path='/accept' element={<SelectAccept />} />
        </Routes>
      </div>
    </div>
  );
};

export default Clinic;
