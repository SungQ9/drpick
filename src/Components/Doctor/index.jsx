import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorDashBoard from './DoctorDashBoard';
import DoctorClinic from './Clinic';
import DoctorManagement from './DoctorManagement';
import DoctorProfileEdit from './DoctorProfileEdit';
import '../../css/DoctorStyle.css';

const Doctor = () => {
  return (
    <div className='mypageForm'>
      <Routes>
        <Route path='/' element={<DoctorDashBoard />} />
        <Route path='/doctor' element={<DoctorClinic />} />
        <Route path='/doctor/manager' element={<DoctorManagement />} />
        <Route path='/doctor/profile' element={<DoctorProfileEdit />} />
      </Routes>
    </div>
  );
};

export default Doctor;
