import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashBoard from './DashBoard/index';
// import UserManage from './UserManage';
import List from '../Layout/List/index';
import DoctorManage from './DoctorManage';
import HospitalManage from './HospitalManage';
import DrugStoreManage from './DrugStoreManage';
import Inquiry from './InquiryManage/index';
import Statistics from './Statistics';

const Admin = () => {
  return (
    <div className='mypageForm'>
      <Routes>
        <Route path='/' element={<AdminDashBoard />} />
        <Route path='/admin/user' element={<List />} />
        <Route path='/admin/doctor/*' element={<DoctorManage />} />
        <Route path='/admin/hospital' element={<HospitalManage />} />
        <Route path='/admin/drugstore' element={<DrugStoreManage />} />
        <Route path='/admin/inquiry' element={<Inquiry />} />
        <Route path='/admin/statistics' element={<Statistics />} />
      </Routes>
    </div>
  );
};

export default Admin;
