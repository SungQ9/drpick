// 결제수단관리
import React, { useEffect } from 'react';
import Payment from './Payment';
import ChargePoint from './ChargePoint';

const PaymentManagement = () => {
  useEffect(() => {
    // 컴포넌트가 마운트되거나 언마운트될 때 실행되는 코드
    document.querySelector('.mypageForm').style.background = 'none';

    return () => {
      // 언마운트 시에 정리 코드
      document.querySelector('.mypageForm').style.background = ''; // 원래의 스타일로 되돌리기
    };
  }, []); // 빈 배열은 마운트 및 언마운트 시에만 실행
  return (
    <div className='formContainer'>
      <Payment />
      <ChargePoint />
    </div>
  );
};

export default PaymentManagement;
