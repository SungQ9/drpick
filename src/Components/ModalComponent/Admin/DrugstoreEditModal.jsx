// 약국 추가,수정 모달
import React, { useState } from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import Input from '../../Layout/Input';
import Address from '../../Layout/Address';
import WorkTime from '../../Layout/List/ProfileEditList/WorkTime';
import useAlert from '../../Layout/Alert';

// type = 추가인지 수정인지 (수정일때만 type='modify')
const DrugstoreEditModal = ({ onClose, type, item = {}, fetchData }) => {
  const { token, userEmail } = useTokenContext();
  const [selectedDrugstoreName, setSelectedDrugstoreName] = useState(
    item.drugstoreName || '',
  );
  const [drugstoreId, setDrugstoreId] = useState(item.drugstoreId || '');
  const [drugstoreName, setDrugstoreName] = useState(item.drugstoreName || '');
  const [drugstoreTel, setDrugstoreTel] = useState(item.drugstoreTel || '');
  const [address, setAddress] = useState({ main: '', detail: '', subdetail: '' });
  const { Alert } = useAlert();

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const drugstoreData = {
    drugstoreId: drugstoreId,
    drugstoreName: drugstoreName,
    drugstoreTel: drugstoreTel,
    drugstoreAddrMain: address.main,
    drugstoreAddrDetail: address.detail,
    drugstoreAddrSubdetail: address.subdetail,
  };

  const updateDrugstoreInfo = async () => {
    try {
      //주소를 다 적지 못하면
      if (!address.subdetail) {
        const message = 'Subdetail 주소를 입력해주세요.'; 
        await Alert('주소 입력 오류', message, 'error');
        return; 
      }

      // 병원 정보 업데이트
      const infoRes = await axios.post(
        'http://localhost:8080/admin/updateDrugstoreInfo',
        drugstoreData,
        config,
      );
      if (infoRes.status === 200) {
        const message = '약국정보수정 완료하였습니다.';
        await Alert('약국수정 성공', message, 'success');
        onClose();
        fetchData();
      } else {
        console.error(
          '약국 정보 업데이트 오류: 예상하지 못한 HTTP 상태 코드:',
          infoRes.status,
        );
      }
    } catch (error) {
      console.error('약국 정보 업데이트 오류:', error);
    }
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
        <button
          className='clinicSubBtn-mid'
          style={{ background: '#11C2AD' }}
          onClick={updateDrugstoreInfo}
        >
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
