import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import PatientDetail from '../../ModalComponent/Doctor/PatientDetailModal';
import CertificateModal from '../../ModalComponent/User/CertificateModal';
import PrescriptionModal from '../../ModalComponent/User/PrescriptionModal';
import Video from '../../User/Clinic/ApplicationForm/ClinicRoom/VideoChat/index';

const PatientList = ({ type, data }) => {
  const { openModal } = useModalContext();

  const handleBtnClick = (type) => {
    switch (type) {
      case 'register':
        break;
      case 'cancel':
        break;
      case 'start':
        openModal(<Video />);
        break;
      case 'request':
        break;
      case 'certificate':
        openModal(<CertificateModal />);
        break;
      case 'prescription':
        openModal(<PrescriptionModal />);
        break;
    }
    console.log(type, '버튼 클릭');
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
      {/*예시 li 반복문으로 데이터  생성되면 지우세요 */}
      <li
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div
          className='patientList-left'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
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
              <a>이환자</a>
            </h3>
            <span style={{ marginLeft: '10px' }}>15:23</span>
          </div>
          <div className='patientList-bottom' style={{ marginTop: 0 }}>
            <span>어디어디가 아파요</span>
          </div>
        </div>
        {type === 'wait' && (
          <div className='patientList-right'>
            <button
              className='listBtn-short'
              style={{ width: '65px' }}
              onClick={() => {
                handleBtnClick('register');
              }}
            >
              접수
            </button>
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
        {type === 'list' && (
          <div className='patientList-right'>
            <button
              className='listBtn-short'
              style={{ width: '65px' }}
              onClick={() => {
                handleBtnClick('start');
              }}
            >
              진료시작
            </button>
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
      {/*반복문 시작지점 */}
      {data && data.length > 0 ? (
        data.map((patient, index) => (
          <li
            key={index} // 고유 key 값으로 index를 사용합니다. 가능하면 더 구체적인 고유 값을 사용하세요.
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <div
              className='patientList-left'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
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
                  <a>{patient.name}</a> {/* 환자 이름 */}
                </h3>
                <span style={{ marginLeft: '10px' }}>{patient.time}</span>{' '}
                {/* 접수시간 */}
              </div>
              <div className='patientList-bottom' style={{ marginTop: 0 }}>
                <span>
                  {' '}
                  {patient.description.length > 10
                    ? patient.description.substring(0, 10) + '...'
                    : patient.description}
                </span>{' '}
                {/* 환자 상태 또는 증상, 10자리 까지만 보여주고 자름  */}
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
      )}
    </ul>
  );
};

export default PatientList;
