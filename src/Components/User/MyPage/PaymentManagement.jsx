import React, { useState, useEffect } from 'react';
import Payment from './Payment';
import ChargePoint from './ChargePoint';

const PaymentManagement = () => {
  const [backgroundStyle, setBackgroundStyle] = useState('none');

  useEffect(() => {
    setBackgroundStyle('none');
    return () => {
      setBackgroundStyle('');
    };
  }, []);

  return (
    <div className='formContainer' style={{ background: backgroundStyle }}>
      <Payment />
      <ChargePoint />
    </div>
  );
};

export default PaymentManagement;
