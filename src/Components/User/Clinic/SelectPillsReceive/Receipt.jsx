import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../../Context/TokenContext';
import axios from 'axios';
import Loading from '../../ImageSearch/Loading';
import doctor from '../../../../img/doctor-icon.png';
import hospital from '../../../../img/hospital-icon.png';
import useAlert from '../../../Layout/Alert';

//임시로 certificateNum을 1로 설정, 추후 certificateNum값을 넘기도록 수정 (handlePyamentclick=> axios.get => params)

const Receipt = ({ selectedPrice, certificateNum }) => {
  const [price, setPrice] = useState(0); // 기존의 price 상태 (기본값 0으로 설정)
  const [totalPrice, setTotalPrice] = useState(0); // 최종 가격을 저장할 상태
  const [paymentInfo, setPaymentInfo] = useState(null);
  const navigate = useNavigate();
  const { token } = useTokenContext();
  const { Alert } = useAlert();
  const { Question } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentId, setPaymentId] = useState(0);

  // 페이지 렌더 시 정보 출력
  useEffect(() => {
    setIsLoading(true);
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/payments/getPaymentMethod',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              certificateNum: certificateNum,
            },
          },
        );
        if (response.status === 200) {
          setPaymentInfo(response.data);
          setPrice(response.data.amount);
          setPaymentId(response.data.paymentId);
        }
      } catch (error) {
        console.error('결제 정보 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [certificateNum, token]);

  //  수령방법에 따른 진료비 변경
  useEffect(() => {
    // selectedPrice와 price를 더합니다.
    setTotalPrice(price + selectedPrice);
  }, [selectedPrice, price]);

  // 숫자를 천 단위 구분 문자열로 변환하는 함수
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };

  // 결제 정보
  const handlePaymentClick = async () => {
    const result = await Question('결제를 진행하시겠습니까?', '', 'question');

    if (result === '확인') {
      try {
        if (paymentInfo.reservationPayment === 'CARD') {
          console.log('paymentId : ', paymentId);
          console.log('amount : ', totalPrice);
          navigate(`/payment/billingCharge`, {
            state: {
              amount: totalPrice,
              paymentId: paymentId,
              certificateNum: certificateNum,
            },
          });
        } else if (paymentInfo.reservationPayment === 'POINT') {
          navigate(`/payment/pointPayment`, {
            state: {
              amount: totalPrice,
              paymentId: paymentId,
              certificateNum: certificateNum,
            },
          });
        }
      } catch (err) {
        console.error('에러발생 :', err);
      }
    } else {
      return null;
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='receipt-main'>
      <div className='receipt-title'>
        <h1>결제정보</h1>
      </div>
      {price !== 0 ? (
        <>
          <div className='receipt-bill'>
            <h3 style={{ marginBottom: '0px' }}>진료비</h3>
            <div className='receipt-bill-price'>
              <h1 style={{ marginTop: '0px' }}>{formatPrice(totalPrice)}</h1>
              <h2 style={{ marginLeft: '10px', marginTop: '0px' }}>원</h2>
            </div>
          </div>
        </>
      ) : (
        <div className='receipt-bill'>
          <div className='receipt-bill-price'>
            <h2 style={{ marginTop: '0px' }}>
              아직 진료비가 등록되지 않았습니다
            </h2>
          </div>
        </div>
      )}

      <div className='receipt-info'>
        <ul style={{ listStyle: 'none', position: 'relative', right: '45px' }}>
          <li>
            <img src={doctor} alt='doctor' />
            <h2>{paymentInfo.doctorName}</h2>
          </li>
          <li style={{ marginTop: '50px' }}>
            <img src={hospital} alt='hospital' />
            <h2>{paymentInfo.hospitalName}</h2>
          </li>
        </ul>
      </div>
      <div className='receipt-pay'>
        {price !== 0 ? (
          <button
            className='clinicBtn-long'
            style={{ width: '350px' }}
            onClick={handlePaymentClick}
          >
            결제하기 & 배송시작{' '}
          </button>
        ) : (
          <button
            className='clinicBtn-long'
            style={{ width: '350px', background: '#AECCC8', cursor: 'auto' }}
          >
            잠시만 기다려주세요
          </button>
        )}
      </div>
    </div>
  );
};

export default Receipt;
