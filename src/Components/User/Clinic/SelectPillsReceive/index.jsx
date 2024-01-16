import React, { useState } from 'react';
import Delivery from './Delivery';
import Receipt from './Receipt';

const SelectPillsReceive = () => {
  const [currentDisplay, setCurrentDisplay] = useState('delivery');

  const showDelivery = () => {
    setCurrentDisplay('delivery');
  };

  return (
    <div>
      {currentDisplay === 'delivery' && (
        <Delivery onButtonClick={() => setCurrentDisplay('receipt')} />
      )}
      {currentDisplay === 'receipt' && <Receipt onButtonClick={showDelivery} />}
    </div>
  );
};

export default SelectPillsReceive;
