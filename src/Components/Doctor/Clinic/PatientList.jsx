import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import ImgModal from '../../ModalComponent/User/ImgModal';
import Video from '../../User/Clinic/ApplicationForm/ClinicRoom/VideoChat/index';

const PatientList = ({ type, data }) => {
  const { openModal } = useModalContext();
  const handleBtnClick = (type) => {
    switch (type) {
      case 'start':
        openModal(<Video />);
        break;
      case 'certificate':
      case 'prescription':
        openModal(<ImgModal />);
        break;
      // Handle other cases as needed
      default:
        break;
    }
  };

  return (
    <ul
      className='patientList'
      style={{
        width: '100%',
        position: 'relative',
        listStyle: 'none',
        marginRight: '40px',
      }}
    >
      {/* 반복문 시작지점 */}
      {data && Array.isArray(data) ? (
        data.length > 0 ? (
          data.slice(0, 10).map((patient, index) => (
            <li
              key={patient.reservationNum}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '60px',
                borderBottom: index === 9 ? 'none' : '1px solid #cecece',
              }}
            >
              <div
                className='patientList-left'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '170px',
                }}
              >
                <div
                  className='patientList-top'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    <a>{patient.memberName}</a> {/* 환자 이름 */}
                  </h3>
                  {/* 접수시간 */}
                  <span style={{ marginLeft: '10px' }}>
                    {patient.reservationStatus}
                  </span>{' '}
                </div>
                <div className='patientList-bottom' style={{ marginTop: 0 }}>
                  <span>
                    {' '}
                    {patient.patientComments &&
                    patient.patientComments.length > 10
                      ? patient.patientComments.substring(0, 10) + '...'
                      : patient.patientComments}
                  </span>{' '}
                </div>
              </div>
              {type === 'wait' && (
                <div className='patientList-right'>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px' }}
                    onClick={() => {
                      handleBtnClick('');
                    }}
                  >
                    접수
                  </button>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('');
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
              {type === 'list' && (
                <div className='patientList-right'>
                  {patient.certificateStatus === 'Y' ? (
                    <button
                      className='listBtn-short'
                      style={{ width: '65px' }}
                      onClick={() => {
                        handleBtnClick('start');
                      }}
                    >
                      진료시작
                    </button>
                  ) : (
                    <button
                      className='listBtn-short'
                      style={{ width: '65px' }}
                      onClick={() => {
                        handleBtnClick('request');
                      }}
                    >
                      입장요청
                    </button>
                  )}
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('cancel');
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
              {type === 'end' && (
                <div className='patientList-right'>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px' }}
                    onClick={() => {
                      handleBtnClick('certificate');
                    }}
                  >
                    진단서
                  </button>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('prescription');
                    }}
                  >
                    처방전
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>조회된 내용이 없습니다.</li>
        )
      ) : (
        <li>Loading...</li>
      )}
    </ul>
  );
};

export default PatientList;
