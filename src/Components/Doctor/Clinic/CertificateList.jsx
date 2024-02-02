import React from 'react';
import PatientList from './PatientList';

const CertificateList = ({ datas, fetchData }) => {
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
        <PatientList type={'list'} datas={datas} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default CertificateList;
