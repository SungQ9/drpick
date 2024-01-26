import React from 'react';

const PatientDetail = ({ item = {} }) => {
  return (
    <table className='patientInfo'>
      <tr>
        <td> 진료일 :</td>
        <td> 2023.12.31</td>
        <td> 진료비:</td>
        <td> 9,000</td>
      </tr>
      <tr>
        <td> 진료의사 :</td>
        <td> 김의사</td>
        <td> 진단서:</td>
        <td>
          {' '}
          <a>홍길동_처방전_pdf</a>
        </td>
      </tr>
      <tr>
        <td>증상:</td>
        <td>심한 발열과 복통</td>
      </tr>
    </table>
  );
};

export default PatientDetail;
