import React from 'react';
import ReceptionWait from './ReceptionWait';
import CertificateList from './CertificateList';
import EndList from './EndList';

const DoctorClinic = () => {
  return (
    <div>
      <h2
        style={{
          textAlign: 'left',
          margin: '10px 0px 30px 50px',
          fontSize: '30px',
          fontWeight: 'bold',
        }}
      >
        비대면 진료
      </h2>
      <div
        style={{
          display: 'flex ',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ReceptionWait />
        <CertificateList />
        <EndList />
      </div>
    </div>
  );
};

export default DoctorClinic;
