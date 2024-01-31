// 환자 상세 모달
import React from 'react';
import PatientDetail from './PatientDetail';

const PatientDetailModal = ({ onClose, item = {} }) => {
  return (
    <div className='patientDetail-modal'>
      <table className='patientDetail-top'>
        <tr>
          <td>
            <h3>이름</h3>
          </td>
          <td>{item.memberName}</td>
        </tr>
        <tr>
          <td>
            <h3>연락처</h3>
          </td>
          <td>{item.memberTel}</td>
        </tr>
        <tr>
          <td>
            <h3>생년월일</h3>
          </td>
          <td>2000.01.01</td>
          <td>
            <h3>최근진료일</h3>
          </td>
          <td style={{ paddingLeft: '10px' }}>2024.01.20</td>
        </tr>
      </table>
      <table className='patientDetail-bottom'>
        <tr>
          <td style={{ verticalAlign: 'top', width: '50px' }}>
            <h3>진료내역</h3>
          </td>
          <td className='patientDetail' colSpan={3} style={{ width: '530px' }}>
            <PatientDetail />
          </td>
        </tr>
        <tr>
          <td></td>
          <td className='patientDetail' colSpan={3} style={{ width: '530px' }}>
            <PatientDetail />
          </td>
        </tr>
        <tr>
          <td></td>
          <td className='patientDetail' colSpan={3} style={{ width: '530px' }}>
            <PatientDetail />
          </td>
        </tr>
        <tr>
          <td></td>
          <td className='patientDetail' colSpan={3} style={{ width: '530px' }}>
            <PatientDetail />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default PatientDetailModal;
