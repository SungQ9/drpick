import React from 'react';
import PatientList from './PatientList';

const EndList = () => {
  const data = '';
  return (
    <div className='doctorClinic-form'>
      <div className='doctorClinic-title'>
        <h2>진료종료</h2>
      </div>
      <div
        className='patient'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PatientList type={'end'} data={data} />
      </div>
    </div>
  );
};

export default EndList;
