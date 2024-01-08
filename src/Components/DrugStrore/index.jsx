import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DrugStoreDashBoard from './DrugStoreDashBoard';

const DrugStore = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<DrugStoreDashBoard />} />
          <Route path='' element='' />
        </Routes>
      </div>
    </div>
  );
};

export default DrugStore;
