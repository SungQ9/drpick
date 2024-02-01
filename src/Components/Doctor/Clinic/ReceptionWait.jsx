import React from 'react';
import PatientList from './PatientList';

const ReceptionWait = ({ datas, fetchData }) => {
  return (
    <div className='doctorClinic-form'>
      <div className='doctorClinic-title'>
        <h2>접수대기</h2>
      </div>
      <div
        className='patient'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PatientList type={'wait'} datas={datas} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default ReceptionWait;
