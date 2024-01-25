import React, { useState } from 'react';
import Select from '../../Layout/Select';
import { useModalContext } from '../../Context/ModalContext';
import SearchHospitalModal from '../Doctor/SearchHospitalModal';

const DoctorProfileEdit = ({ onClose }) => {
  const [hospitalName, setHospitalName] = useState('');
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
        className='profile-table'
        style={{ borderCollapse: 'separate', borderSpacing: '10px 5px' }}
      >
        <tr>
          <td colSpan={2}>
            <h5>
              <span>*</span> 의사 이름을 입력해주세요
            </h5>
            <input type='text' style={{ width: '100%' }} />
          </td>
        </tr>
        <tr>
          <td>
            <h5>
              <span>*</span> 진료과목을 선택해주세요
            </h5>
            <input type='text' />
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
              style={{ width: '100%', height: '50px' }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <h5 style={{ marginLeft: '7px' }}>
              {' '}
              <span>*</span> 소속병원을 선택해주세요
            </h5>
            <input type='text' className='hospitalName' value={hospitalName} />
          </td>
          <td style={{ verticalAlign: 'bottom' }}>
            <button
              style={{
                width: '100%',
                height: '50px',
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
            <h5 style={{ marginLeft: '7px' }}> 전공을 입력해주세요</h5>
            <input type='text' style={{ width: '100%' }} />
          </td>
        </tr>
      </table>

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
