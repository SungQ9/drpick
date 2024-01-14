import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DrugStoreDashBoard from './DrugStoreDashBoard';
import DrugStoreManagement from './DrugStoreManagement';
import DrugStoreProfileEdit from './DrugStoreProfileEdit';

const DrugStore = () => {
  return (
    <div className='mypageForm'>
      <Routes>
        <Route path='/' element={<DrugStoreDashBoard />} />
        <Route path='/drugstore' element={<DrugStoreManagement />} />
        <Route path='/drugstore/profile' element={<DrugStoreProfileEdit />} />
      </Routes>
    </div>
  );
};

export default DrugStore;
