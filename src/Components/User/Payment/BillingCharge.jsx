import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';

// 자동결제 토스에 요청
function BillingCharge() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useTokenContext();
  const certificateNum = location.state?.certificateNum;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberId: localStorage.getItem('userId'),
    },
  };

  //토스에 결재 요청
  useEffect(() => {
    const { amount, paymentId } = location.state || {};
    console.log('결제창 amount :', amount);
    console.log('결제창 paymentId :', paymentId);

    if (!amount || !paymentId) {
      navigate(`/payment/Failure:${certificateNum}`);
      return;
    }

    // 회원정보 불러오기
    axios
      .get('http://localhost:8080/payments/getUserPaymentMethodAmount', config)
      .then(function (response) {
        const data = response.data;

        // orderId 생성
        const generateRandomOrderId = () => {
          const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
          const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
          let orderId = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            orderId += characters.charAt(randomIndex);
          }
          return orderId;
        };
        const randomOrderId = generateRandomOrderId();

        var headers = {
          Authorization:
            'Basic dGVzdF9za19RYmdNR1p6b3J6NUE0a21COWRFbFZsNUUxZW00Og==',
          'Content-Type': 'application/json',
        };

        // 토스 자동결제 진행
        axios
          .request({
            method: 'POST',
            url: 'https://api.tosspayments.com/v1/billing/' + data.billingKey,
            headers,
            data: {
              customerKey: data.customerKey,
              amount: amount,
              orderId: randomOrderId,
              orderName: '진료비',
              customerEmail: data.memberEmail,
              customerName: data.memberName,
            },
          })
          .then(function (response) {
            console.log('토스를 다녀온 뒤 ', response);
            const responseData = encodeURIComponent(
              JSON.stringify({ ...response.data, paymentId }),
            );

            navigate(`/payment/billingSuccess`, {
              state: { responseData, certificateNum: certificateNum },
            });
          })
          .catch(function (error) {
            console.error('결제에러:', error);
            navigate(`/payment/Failure`, {
              state: { certificateNum: certificateNum },
            });
          });
      })
      .catch(function (error) {
        console.error('결제창 에러 ', error);
      });
  }, [location]);
}

export default BillingCharge;
