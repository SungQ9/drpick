import React, { useState } from 'react';
import Delivery from './Delivery';
import Receipt from './Receipt';

const SelectPillsReceive = () => {
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleSelectPrice = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Delivery onSelectPrice={handleSelectPrice} />
      <Receipt selectedPrice={selectedPrice} />
    </div>
  );
};

export default SelectPillsReceive;
