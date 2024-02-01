import React from 'react';

const PatientDetail = ({ item = [] }) => {
  console.log('환자상세', item);
  const certificate = item.fileName ? item.fileName : '-';
  const amount = item.amount ? item.amount : '-';

  return (
    <table className='patientInfo'>
      <tr>
        <td> 진료일 :</td>
        <td> {item.certificateDate}</td>
        <td> 진료비:</td>
        <td> {amount}</td>
      </tr>
      <tr>
        <td> 진료의사 :</td>
        <td> {item.doctorName}</td>
        <td> 진단서:</td>
        <td>
          {' '}
          <a>{certificate}</a>
        </td>
      </tr>
      <tr>
        <td>증상:</td>
        <td>{item.description}</td>
      </tr>
    </table>
  );
};

export default PatientDetail;
