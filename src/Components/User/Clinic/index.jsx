import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/LayoutStyle.css';
import A0 from './a0';
import A1 from './a1';
import A2 from './a2';

const Clinic = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<A0 />} />
          <Route path='/a1' element={<A1 />} />
          <Route path='/a2' element={<A2 />} />
        </Routes>
      </div>
    </div>
  );
};

export default Clinic;
