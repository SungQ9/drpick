import React from 'react';

const PillReceiveModal = ({ onClose, item = {} }) => {
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
        ></textarea>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '350px',
        }}
      >
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
export default PillReceiveModal;
