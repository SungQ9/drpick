// 약국 추가,수정 모달
import React, { useState } from 'react';
import Input from '../../Layout/Input';
import Address from '../../Layout/Address';
import WorkTime from '../../Layout/List/ProfileEditList/WorkTime';

// type = 추가인지 수정인지 (수정일때만 type='modify')
const DrugstoreEditModal = ({ onClose, type, item = {} }) => {
  const [selectedDrugstoreName, setSelectedDrugstoreName] = useState(
    item.drugstoreName || '',
  );
  const [drugstoreTel, setDrugstoreTel] = useState(item.drugstoreTel || '');
  const [address, setAddress] = useState({ main: '', detail: '' });
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  return (
    <div
      style={{
        width: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <table id='signUpInputForm' className='signUpTable'>
        <tr>
          <td colSpan={2}>
            <Input
              id='drugstore_name'
              className='member_name'
              label='약국이름'
              type='text'
              placeholder='약국명을 입력하세요'
              style={{ width: '500px' }}
              value={selectedDrugstoreName.trim()}
              onChange={(e) => setDrugstoreTel(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='drugstore_tel'
              className='member_name'
              label='전화번호'
              type='text'
              placeholder='대표번호를 입력하세요'
              style={{ width: '500px' }}
              value={drugstoreTel.trim()}
              onChange={(e) => setSelectedDrugstoreName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: '510px' }}>
            <Address
              onAddressSelect={handleAddressSelect}
              itemAddr={item.drugstoreAddrMain}
              itemAddrDetail={item.drugstoreAddrDetail}
            />
          </td>
        </tr>
      </table>
      <div
        id='drugstore_worktime'
        className='profile-bottom'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <h3 style={{ position: 'relative', right: '235px' }}>
          <span style={{ color: 'red' }}>*</span> 영업 시간 설정
        </h3>
        <WorkTime style={{ position: 'relative', left: '40px' }} />
      </div>
      <div className='modify-button'>
        {type === 'modify' && (
          <button
            className='clinicSubBtn-short'
            style={{ background: 'red', height: '50px' }}
          >
            삭제
          </button>
        )}
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

export default DrugstoreEditModal;
