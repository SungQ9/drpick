import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  const queryParams = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  useEffect(() => {
    const orderId = queryParams["orderId"];
    if (!orderId) {
      setPaymentInfo({ message: "포인트로 결제" });
      return;
    }

    const requestData = {
      orderId: orderId,
      amount: queryParams["amount"],
      paymentKey: queryParams["paymentKey"],
    };

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
      });

      const json = await response.json();

      if (!response.ok) {
        navigate(`/payment/failure`);
        return;
      }

      // Append requestData to paymentInfo
      const updatedPaymentInfo = {
        ...json,
        requestData: requestData,
      };

      setPaymentInfo(updatedPaymentInfo);
      navigate("/payment/success", { replace: true });
    }

    confirm();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <div>
          <h2 style={{ padding: "20px 0px 10px 0px" }}>결제 성공</h2>
          <h2>JSON 데이터:</h2>
          <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
        </div>
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
