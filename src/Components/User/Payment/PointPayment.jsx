import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';
import Loading from '../ImageSearch/Loading';

// 자동결제 토스에 요청
function PointPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userAuth } = useTokenContext();
  const { Alert } = useAlert();
  const { amount, paymentId, certificateNum } = location.state || {};

  const handlePaymentResult = (result) => {
    if (result === 'success') {
      // 결제 성공 알림 표시
      Alert('성공', '결제가 성공적으로 완료되었습니다.', 'success');
      navigate('/user');
    } else {
      // 결제 실패 알림 표시
      Alert('실패', '결제에 실패하였습니다.', 'error');
    }
  };
  //포인트 결재진행
  useEffect(() => {
    if (!amount || !paymentId) {
      handlePaymentResult('fail');
      return;
    }

    // 회원정보 불러오기
    axios
      .get('http://localhost:8080/payments/getUserPaymentMethodAmount', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          memberId: localStorage.getItem('userId'),
        },
      })
      .then(function (response) {
        const data = response.data;

        // DB에 포인트 결제 진행
        axios
          .put(
            'http://localhost:8080/payments/payPoints',
            {
              memberId: localStorage.getItem('userId'),
              reservationPayment: 'POINT',
              amount: -amount, //결제를 위해서 음수처리
              transactionDate: new Date().toISOString(),
              paymentId: paymentId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          .then(function (response) {
            // 결제 성공 시
            handlePaymentResult('success');
          });
      })
      .catch((error) => {
        console.error('에러:', error);
        handlePaymentResult('fail');
      })
      .catch((error) => {
        console.error('에러:', error);
        handlePaymentResult('fail');
      });
  }, [location, navigate, token]);

  return (
    <div>
      <Loading />
    </div>
  );
}

export default PointPayment;
