import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess'; 
import PaymentFailure from './PaymentFailure';
import BillingSuccess from './BillingSuccess';
import BillingFailure from './BillingFailure';

const Payment = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />
          <Route path='/paymentFailure' element={<PaymentFailure />} />
          <Route path='/billingSuccess' element={<BillingSuccess />} />
          <Route path='/billingFailure' element={<BillingFailure />} />
        </Routes>
      </div>
    </div>
  );
};

export default Payment;
