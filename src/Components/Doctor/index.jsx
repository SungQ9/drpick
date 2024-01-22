import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DoctorDashBoard from './DoctorDashBoard';
import DoctorClinic from './Clinic';
import DoctorManagement from './DoctorManagement';
import DoctorProfileEdit from './DoctorProfileEdit';
import '../../css/DoctorStyle.css';

const Doctor = () => {
  const location = useLocation();
  const isProfileEditPage = location.pathname === '/doctor/profile';
  return (
    <div className={` ${isProfileEditPage ? 'profileEditForm' : 'mypageForm'}`}>
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
