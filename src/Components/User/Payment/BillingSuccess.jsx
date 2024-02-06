import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';

function BillingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useTokenContext();
  const certificateNum = location.state?.certificateNum;

  // URL에서 인코딩된 결제 데이터를 디코딩하고 파싱.
  const encodedBillingData = location.state?.responseData;
  const billingData = encodedBillingData
    ? JSON.parse(decodeURIComponent(encodedBillingData))
    : null;

  useEffect(() => {
    const completePayment = async () => {
      if (!billingData) {
        // 결제 데이터가 없으면 결제 실패 페이지로 이동합.
        navigate(`/payment/Failure:${certificateNum}`);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          paymentId: billingData.paymentId,
          reservationPayment: 'CARD',
        },
      };

      try {
        // 결제 완료 요청.
        await axios.put(
          'http://localhost:8080/payments/completePayment',
          config,
        );
      } catch (error) {
        console.error('에러: ', error);
        // 결제 실패 시 결제 실패 페이지로 이동.
        navigate('/payment/Failure');
      }
    };
    completePayment();
  }, [billingData, navigate, token]);

  if (!billingData) {
    // 결제 데이터가 없으면 결제 정보를 불러올 수 없다는 메시지를 표시.
    return (
      <div className='billing-success-container'>
        결제 정보를 불러올 수 없습니다.
      </div>
    );
  }

  // 카드 번호를 포맷팅하는 함수
  const formatCardNumber = (number) => {
    const segments = [];
    let segment = '';

    for (let char of number) {
      segment += char;
      if (segment.length === 4 || (char === '*' && segment.length > 4)) {
        segments.push(segment);
        segment = '';
      }
    }

    if (segment) {
      segments.push(segment); // 나머지가 있으면 마지막 세그먼트를 추가.
    }

    return segments.join('-');
  };

  return (
    <div
      className='billing-success-container'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* 결제 성공 메시지 */}
        <h1 style={{ marginTop: '0' }}>결제에 성공하셨습니다</h1>
        <div className='payment-details'>
          <p style={{ marginBottom: '10px' }}>
            {/* 결제 금액 라벨 */}
            <strong>결제 금액:</strong> {/* 결제 금액 (동적 데이터) */}
            {billingData.totalAmount.toLocaleString()} 원
          </p>
          <p>
            {/* 결제 수단 (카드) 라벨 */}
            <strong>결제 수단:</strong> {billingData.method}
          </p>
          <p>
            {/* 카드 타입 (신용/체크) 라벨 */}
            <strong>카드 타입:</strong> {billingData.card.cardType}
          </p>
          <p>
            {/* 카드 번호 라벨 */}
            <strong>카드 번호:</strong> {/* 카드 번호 포맷팅 함수 적용 */}
            {formatCardNumber(billingData.card.number)}
          </p>
          <button
            onClick={() => {
              // 결제수단관리 페이지로 이동하는 버튼
              navigate('/user/payment');
            }}
            style={{ width: '150px', height: '50px' }}
          >
            {/* 결제수단관리 페이지로 이동 버튼 */}
            결제수단관리 <br />
            페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingSuccess;
