import React from 'react';
import PatientList from './PatientList';

const CertificateList = ( {data} ) => {
  return (
    <div className='doctorClinic-form'>
      <div className='doctorClinic-title'>
        <h2>진료목록</h2>
      </div>
      <div
        className='patient'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PatientList type={'list'} data={data} />
      </div>
    </div>
  );
};

export default CertificateList;
