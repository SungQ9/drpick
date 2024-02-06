import React, { useState } from 'react';
import Delivery from './Delivery';
import Receipt from './Receipt';
import { useLocation } from 'react-router-dom';

const SelectPillsReceive = () => {
  const [selectedPrice, setSelectedPrice] = useState(0);

  const location = useLocation();
  const certificateNum = location.state?.certificateNum;
  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Delivery
        onSelectPrice={handleSelectPrice}
        certificateNum={certificateNum}
      />
      <Receipt selectedPrice={selectedPrice} certificateNum={certificateNum} />
    </div>
  );
};

export default SelectPillsReceive;
