import React, { useState } from 'react';
import arrowDown from '../../../img/arrow-down-icon.png';
import arrowUp from '../../../img/arrow-up-icon.png';

const SymptomCategory = ({ title, items, img, subject, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className='symptomSubList'
      style={{ borderBottom: '1px solid #cecece', marginBottom: '15px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '15px',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={img} alt={img} />
          <h2 style={{ marginLeft: '30px' }}>{title}</h2>
        </div>
        <img
          src={isOpen ? arrowUp : arrowDown}
          alt={isOpen ? 'Up' : 'Down'}
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div className='symptomUldiv'>
          {items.map((item, index) => (
            <div
              className='symptomLidiv'
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onSelect(subject);
              }}
            >
              <h4>{item}</h4>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default SymptomCategory;
