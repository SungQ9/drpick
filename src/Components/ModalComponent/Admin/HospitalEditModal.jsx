// 병원 추가,수정 모달
import React, { useState, useEffect } from 'react';
import Input from '../../Layout/Input';
import Adress from '../../Layout/Adress';

// data = PK ( 넘어온 PK로 해당 컴포넌트에서 데이터 조회 )
// type = 추가인지 수정인지 (수정일때만 type='modify')
const HospitalEditModal = ({ onClose, type, item = {} }) => {
  const [selectedName, setSelectedName] = useState('');
  const [address, setAddress] = useState({ main: '', detail: '' });
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  useEffect(() => {
    if (type === 'modify' && item) {
      //  수정 'modify' 일때만   데이터 로드
      setSelectedName(item.name || '');
      setAddress(item.address || { main: '', detail: '' });
      // 여기서 스프링에서 데이터를 불러오는 로직을 추가
    }
  }, [item, type]);

  return (
    <div
      style={{
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <table id='signUpInputForm' className='signUpTable'>
        <tr>
          <td colSpan={2}>
            <Input
              id='hospital_name'
              className='member_name'
              label='병원이름'
              type='text'
              placeholder='병원명을 입력하세요'
              style={{ width: '500px' }}
              value={selectedName.trim()}
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='hospital_tel'
              className='member_tel'
              label='전화번호'
              type='text'
              placeholder='대표번호를 입력하세요'
              style={{ width: '500px' }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Adress onAddressSelect={handleAddressSelect} />
          </td>
        </tr>
      </table>
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

export default HospitalEditModal;
