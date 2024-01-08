import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashBoard from './AdminDashBoard';

const Admin = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<AdminDashBoard />} />
          <Route path='' element='' />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
