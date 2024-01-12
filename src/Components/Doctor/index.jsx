import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashBoard from './DoctorDashBoard';

const Doctor = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<DoctorDashBoard />} />
          <Route path='' element='' />
        </Routes>
      </div>
    </div>
  );
};

export default Doctor;
