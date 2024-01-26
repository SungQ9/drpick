// 의사 정보 수정 모달
import React, { useState } from 'react';
import { useModalContext } from '../../Context/ModalContext';
import Input from '../../Layout/Input';
import Select from '../../Layout/Select';
import SearchHospitalModal from '../Doctor/SearchHospitalModal';
import WorkTime from '../../Layout/List/ProfileEditList/WorkTime';

const DoctorProfileEdit = ({ onClose }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const { openModal } = useModalContext();

  const handleOpenModal = (component, name, type) => {
    openModal(component, name, type);
  };
  const handleHospitalSelect = (selectedName) => {
    setHospitalName(selectedName);
  };

  return (
    <div className='modify-content'>
      <table
        id='signUpInputForm'
        className='profile-table'
        style={{
          borderCollapse: 'separate',
          borderSpacing: '10px 10px',
          marginTop: '20px',
        }}
      >
        <tr>
          <td colSpan={2}>
            <Input
              id='doctor_name'
              className='member_name'
              label='이름'
              type='text'
              placeholder='이름을 입력하세요'
              style={{ width: '580px', height: '40px' }}
              value={selectedName.trim()}
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Input
              id='doctor_subject'
              className='member_name'
              label='진료과목'
              type='text'
              placeholder='이름을 입력하세요'
              value={selectedName.trim()}
              style={{ height: '40px' }}
            />
          </td>
          <td style={{ verticalAlign: 'bottom' }}>
            <Select
              options={[
                { value: '가정의학과', label: '가정의학과' },
                { value: '내과', label: '내과' },
                { value: '마취통증과', label: '마취통증과' },
                { value: '비뇨기과', label: '비뇨기과' },
                { value: '산부인과', label: '산부인과' },
                { value: '성형외과', label: '성형외과' },
                { value: '소아과', label: '소아과' },
                { value: '피부과', label: '피부과' },
                { value: '신경외과', label: '신경외과' },
                { value: '안과', label: '안과' },
                { value: '영상의학과', label: '영상의학과' },
                { value: '외과', label: '외과' },
                { value: '이비인후과', label: '이비인후과' },
                { value: '치과', label: '치과' },
              ]}
              style={{ width: '100%', height: '45px' }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Input
              id='doctor_hospital'
              className='member_name'
              label='소속병원'
              type='text'
              placeholder='이름을 입력하세요'
              value={hospitalName}
              style={{ height: '40px' }}
            />
          </td>
          <td style={{ verticalAlign: 'bottom' }}>
            <button
              style={{
                width: '100%',
                height: '44px',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(
                  <SearchHospitalModal
                    onHospitalSelect={handleHospitalSelect}
                  />,
                  '병원검색',
                  'Search',
                );
              }}
            >
              병원검색
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='doctor_hospital'
              className='member_name'
              label='전공'
              type='text'
              placeholder='이름을 입력하세요'
              style={{ width: '580px', height: '40px' }}
            />
          </td>
        </tr>
      </table>
      <div
        id='doctor_worktime'
        className='profile-bottom'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <h3 style={{ position: 'relative', right: '235px' }}>
          <span style={{ color: 'red' }}>*</span> 비대면 진료 시간 설정
        </h3>
        <WorkTime style={{ position: 'relative', left: '40px' }} />
      </div>
      <div className='modify-button'>
        <button
          className='clinicSubBtn-short'
          style={{ background: 'red', height: '50px' }}
        >
          제한
        </button>
        <button className='clinicSubBtn-mid' style={{ background: '#11C2AD' }}>
          저장
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};
export default DoctorProfileEdit;
