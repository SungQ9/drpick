import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';

function BillingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useTokenContext();
  const certificateNum = location.state?.certificateNum;
  const { Alert } = useAlert();

  // URL에서 인코딩된 결제 데이터를 디코딩하고 파싱.
  const encodedBillingData = location.state?.responseData;
  const billingData = encodedBillingData
    ? JSON.parse(decodeURIComponent(encodedBillingData))
    : null;
  console.log(token);

  useEffect(() => {
    const completePayment = async () => {
      if (!billingData) {
        // 결제 데이터가 없으면 결제 실패 페이지로 이동합.
        navigate(`/payment/Failure:${certificateNum}`);
        return;
      }

      try {
        console.log('billingData.paymentId', billingData.paymentId);
        // 결제 완료 요청.
        await axios.put(
          'http://localhost:8080/payments/completePayment',
          null,
          {
            params: {
              paymentId: billingData.paymentId,
              certificateNum: certificateNum,
              reservationPayment: 'CARD',
            },
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        Alert(
          '결제성공',
          `결제금액: ${billingData.totalAmount.toLocaleString()} 원<br/>
          결제수단: ${billingData.method}<br/>
          카드타입: ${billingData.card.cardType}<br/>
          카드번호: ${formatCardNumber(billingData.card.number)}`,
        ).then(navigate('/user'));
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
}

export default BillingSuccess;
