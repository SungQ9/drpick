import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';

const PillReceiveModal = ({ onClose, item = {}, type, fetchData }) => {
  const [remarks, setRemarks] = useState('');
  const { token } = useTokenContext();
  const { Alert } = useAlert();

  useEffect(() => {
    if (item.remarks) {
      setRemarks(item.remarks);
    }
  }, [item.remarks]);

  const saveRemarks = async () => {
    console.log('보내는 Data:', {
      drugstoreHistoryId: item.drugstoreHistoryId,
      remarks: remarks,
    });
    try {
      const response = await axios.post(
        'http://localhost:8080/drugstores/updateDrugstoreHistory',
        {
          drugstoreHistoryId: item.drugstoreHistoryId,
          remarks: remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const message = response.data.body.message;

      if (response.data.body.success) {
        Alert('수령정보 등록 완료', message, 'success').then((result) => {
          if (result.isConfirmed) {
            onClose();
            fetchData();
          }
        });
      }
    } catch (error) {
      console.error('수령확인 에러 ', error);
    }
  };

  const readOnly = !!item.remarks;
  return (
    <div
      style={{
        width: '550px',
        height: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '500px',
          height: '170px',
          background: '#DAF6EE',
          borderRadius: '15px',
          margin: '10px',
        }}
      >
        <textarea
          style={{
            resize: 'none',
            width: '490px',
            height: '160px',
            border: 'none',
            borderRadius: '15px',
            background: 'none',
            padding: '10px 0px 0px 10px',
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: '150px',
          }}
          placeholder='퀵 배송기사 전화번호 또는 송장번호를 입력해주세요'
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          readOnly={readOnly}
        ></textarea>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '350px',
        }}
      >
        {type === 'update' ? (
          <>
            <button
              className='clinicSubBtn-mid'
              style={{ background: '#11C2AD' }}
              onClick={saveRemarks}
            >
              저장
            </button>
            <button className='clinicSubBtn-mid' onClick={onClose}>
              취소
            </button>
          </>
        ) : (
          <button
            className='clinicSubBtn-mid'
            style={{ background: '#11C2AD' }}
            onClick={onClose}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
};
export default PillReceiveModal;
