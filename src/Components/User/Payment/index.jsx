import React                from 'react';
import { Routes, Route }    from 'react-router-dom';
import PaymentPage          from './PaymentPage';
import PaymentSuccess       from './PaymentSuccess'; 
import Failure              from './Failure';
import BillingRecord        from './BillingRecord';
import BillingCharge        from './BillingCharge';
import BillingSuccess       from './BillingSuccess';
import ChargePoint          from './ChargePoint';
import PointPayment         from './PointPayment';
import PointPaymentSuccess  from './PointPaymentSuccess';

const Payment = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/'               element={<PaymentPage />} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />
          <Route path='/Failure'        element={<Failure />} />
          <Route path='/billingRecord'  element={<BillingRecord />} />
          <Route path='/billingCharge'  element={<BillingCharge />} />
          <Route path='/billingSuccess' element={<BillingSuccess />} />
          <Route path='/chargePoint'    element={<ChargePoint />} />
          <Route path='/pointPayment'   element={<PointPayment />} />
          <Route path='/pointPaymentSuccess'   element={<PointPaymentSuccess />} />
        </Routes> 
      </div>
    </div>
  );
};

export default Payment;
