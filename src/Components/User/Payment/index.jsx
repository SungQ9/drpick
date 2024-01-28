import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess'; 
import Failure from './Failure';
import BillingRecord from './BillingRecord';
import BillingCharge from './BillingCharge';
import BillingSuccess from './BillingSuccess';
import ChargePoint from './ChargePoint';

const Payment = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<PaymentPage />} />
          <Route path='/paymentSuccess'   element={<PaymentSuccess />} />
          <Route path='/Failure'          element={<Failure />} />
          <Route path='/billingRecord'    element={<BillingRecord />} />
          <Route path='/billingCharge'    element={<BillingCharge/>}/> 
          <Route path='/billingSuccess'   element={<BillingSuccess/>}/>
          <Route path='/chargePoint'      element={<ChargePoint/>}/>
        </Routes> 
      </div>
    </div>
  );
};

export default Payment;
