import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess'; 
import PaymentFailure from './PaymentFailure';

const Payment = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/success' element={<PaymentSuccess />} />
          <Route path='/failure' element={<PaymentFailure />} />
        </Routes>
      </div>
    </div>
  );
};

export default Payment;
