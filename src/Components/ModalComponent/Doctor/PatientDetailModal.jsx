// 환자 상세 모달
import React from 'react';
import PatientDetail from './PatientDetail';

const PatientDetailModal = ({ onClose, item = {} }) => {
  const certificateInfo = item.certificateInfo;
  const memberInfo = item.memberInfo;
  console.log(item);

  const recentDate =
    certificateInfo.length > 0 ? (
      certificateInfo[0].certificateDate
    ) : (
      <div>조회된 내역이 없습니다</div>
    );

  return (
    <div className='patientDetail-modal'>
      <table className='patientDetail-top'>
        <tr>
          <td>
            <h3>이름</h3>
          </td>
          <td>{memberInfo[0].memberName}</td>
        </tr>
        <tr>
          <td>
            <h3>연락처</h3>
          </td>
          <td>{memberInfo[0].memberTel}</td>
        </tr>
        <tr>
          <td>
            <h3>생년월일</h3>
          </td>
          <td>{memberInfo[0].memberBirth}</td>
          <td>
            <h3>최근진료일</h3>
          </td>
          <td style={{ paddingLeft: '10px' }}>{recentDate}</td>
        </tr>
      </table>

      <table className='patientDetail-bottom'>
        <tr>
          <td style={{ verticalAlign: 'top', width: '50px' }}>
            <h3 style={{ width: '100px' }}>진료내역</h3>
          </td>
          <td></td>
        </tr>
        {certificateInfo.length > 0 ? (
          certificateInfo.map((info, index) => (
            <tr key={index}>
              <td style={{ verticalAlign: 'top', width: '110px' }}></td>
              <td
                className='patientDetail'
                colSpan={3}
                style={{ width: '530px' }}
              >
                <PatientDetail item={info} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td style={{ verticalAlign: 'top', width: '50px' }}></td>
            <td
              className='patientDetail'
              colSpan={3}
              style={{
                width: '530px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h3> 조회된 내용이 없습니다</h3>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default PatientDetailModal;
