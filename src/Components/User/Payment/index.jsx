import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess'; 
import PaymentFailure from './PaymentFailure';
import BillingRecord from './BillingRecord';
import BillingFailure from './BillingFailure';
import BillingCharge from './BillingCharge';
import BillingSuccess from './BillingSuccess';

const Payment = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />
          <Route path='/paymentFailure' element={<PaymentFailure />} />
          <Route path='/billingRecord' element={<BillingRecord />} />
          <Route path='/billingFailure' element={<BillingFailure />} />
          <Route path='/billingCharge' element={<BillingCharge/>}/> 
          <Route path='/billingSuccess' element={<BillingSuccess/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Payment;
