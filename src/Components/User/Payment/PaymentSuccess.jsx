import React, { useEffect,useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    // 스크린샷 찍을시 검열필요
    const secretKey = "test_sk_QbgMGZzorz5A4kmB9dElVl5E1em4";
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        headers: {
          "Authorization": encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      const json = await response.json();

      if (!response.ok) {
        // TODO: 구매 실패 비즈니스 로직 구현
        console.log(json);
        navigate(`/fail?code=${json.code}&message=${json.message}`)    
        return;
      }

      // TODO: 구매 완료 비즈니스 로직 구현
      console.log(json);
      setPaymentInfo(json);
    }
    confirm();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: "20px 0px 10px 0px" }}>
          결제 성공
        </h2>
        {paymentInfo && (
          <div>
            <pre>
              {JSON.stringify(paymentInfo, null, 2)}
            </pre>
          </div>
        )}
        <div className="result wrapper">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="button" style={{ marginTop: '30px', marginRight: '10px' }}>
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="button" style={{ marginTop: '30px', backgroundColor: '#e8f3ff', color: '#1b64da' }}>
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
