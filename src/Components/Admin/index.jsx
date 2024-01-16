import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashBoard from './DashBoard/index';
import Management from './Management/index';
import Statistics from './Statistics';

const Admin = () => {
  return (
    <div className='mypageForm'>
      <Routes>
        <Route path='/' element={<AdminDashBoard />} />
        <Route path='/admin' element={<Management />} />
        <Route path='/admin/statistics' element={<Statistics />} />
      </Routes>
    </div>
  );
};

export default Admin;
