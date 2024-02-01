import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import doctor from '../../../../img/doctor-icon.png';
import hospital from '../../../../img/hospital-icon.png';
import { useTokenContext } from '../../../Context/TokenContext';

//임시로 paymentId를 1로 설정, 추후 paymentId값을 넘기도록 수정
//임시로 certificateNum을 1로 설정, 추후 certificateNum값을 넘기도록 수정

const Receipt = ({ selectedPrice }) => {
  const [price, setPrice] = useState(0); // 기존의 price 상태 (기본값 0으로 설정)
  const [totalPrice, setTotalPrice] = useState(0); // 최종 가격을 저장할 상태
  const navigate = useNavigate();
  const { token, userAuth } = useTokenContext();

  useEffect(() => {
    setPrice(2600);
    // selectedPrice와 price를 더합니다.
    setTotalPrice(price + selectedPrice);
  }, [selectedPrice, price]);

  // 숫자를 천 단위 구분 문자열로 변환하는 함수
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };

  const handlePaymentClick = async () => {
    if (window.confirm('결제를 진행하시겠습니까?')) {
      try {
        const response = await axios.get(
          'http://localhost:8080/payments/getPaymentMethod',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              certificateNum: 1,
            },
          },
        );

        if (response.status === 200) {
          //카드 결제
          if (response.data === 'CARD') {
            navigate('/payment/billingCharge', {
              state: { amount: totalPrice, paymentId: response.data.paymentId },
            });
            //포인트 결제
          } else if (response.data === 'POINT') {
            navigate('/payment/pointPayment', {
              state: { amount: totalPrice, paymentId: response.data.paymentId },
            });
            //DB오류
          } else {
            console.error('잘못입력된 결제방식:', response.data);
            navigate('/payment/Failure');
          }
        } else {
          console.error('응답 에러:', response.status);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }
  };

  return (
    <div className='receipt-main'>
      <div className='receipt-title'>
        <h1>결제정보</h1>
      </div>
      <div className='receipt-bill'>
        <h3 style={{ marginBottom: '0px' }}>진료비</h3>
        <div className='receipt-bill-price'>
          <h1 style={{ marginTop: '0px' }}>{formatPrice(totalPrice)}</h1>
          <h2 style={{ marginLeft: '10px', marginTop: '0px' }}>원</h2>
        </div>
      </div>
      <div className='receipt-info'>
        <ul style={{ listStyle: 'none', position: 'relative', right: '45px' }}>
          <li>
            <img src={doctor} alt='doctor' />
            <h2>의사정보</h2>
          </li>
          <li style={{ marginTop: '50px' }}>
            <img src={hospital} alt='hospital' />
            <h2>병원정보</h2>
          </li>
        </ul>
      </div>
      <div className='receipt-pay'>
        <button
          className='clinicBtn-long'
          style={{ width: '350px' }}
          onClick={handlePaymentClick}
        >
          결제하기 & 배송시작{' '}
        </button>
      </div>
    </div>
  );
};

export default Receipt;
