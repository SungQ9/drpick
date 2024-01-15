import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicButton = ({ status }) => {
  const navigate = useNavigate();

  if (status === false) {
    return (
      <button
        style={{
          width: '650px',
          height: '80px',
          background: '#ACACAC',
          borderRadius: '20px',
          fontSize: '28px',
        }}
      >
        이미 신청한 진료가 있어요
      </button>
    );
  } else {
    return (
      <button
        onClick={navigate('')}
        style={{
          width: '650px',
          height: '80px',
          background: '#11C2AD',
          borderRadius: '20px',
          fontSize: '28px',
        }}
      >
        다음
      </button>
    );
  }
};

export default ClinicButton;
