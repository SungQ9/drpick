import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"; 
import { useTokenContext } from '../../Context/TokenContext';

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const { token, userAuth } = useTokenContext();

  const queryParams = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  useEffect(() => {
    const requestData = {
      orderId: queryParams["orderId"],
      amount: queryParams["amount"],
      paymentKey: queryParams["paymentKey"],
      paymentId: queryParams["paymentId"],
    };

    const secretKey = "test_sk_QbgMGZzorz5A4kmB9dElVl5E1em4";
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      try {
        const response = await axios.post(
          "https://api.tosspayments.com/v1/payments/confirm",
          requestData,
          {
            headers: {
              Authorization: encryptedSecretKey,
              "Content-Type": "application/json",
            },
          }
        );
        const json = response.data;

        if (response.status !== 200) {
          navigate(`/payment/paymentFailure`);
          return;
        }

        //추후 삭제
        const updatedPaymentInfo = {
          ...json,
          requestData: requestData,
        };
        setPaymentInfo(updatedPaymentInfo);


        let transType = "CASH"; 

        if (updatedPaymentInfo.card && updatedPaymentInfo.card.cardType) {
          transType = "CARD"
        }

        //transanctionType 넣는 값 나중에 변동
        await axios.put(
          "http://localhost:8080/payments/completePayment",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              paymentId: queryParams["paymentId"],
              transactionType: transType,
            },
          }
        )

        // param 숨기기
        navigate("/payment/paymentSuccess", { replace: true });

      } catch (error) {
        //에러가 날시 실패 페이지로 이동
        console.error("Error:", error);
        navigate(`/payment/paymentFailure`);
      }
    }

    confirm();
  }, [token]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <div>
          <h2 style={{ padding: "20px 0px 10px 0px" }}>결제 성공</h2>
        </div>
        <div className="result wrapper">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button
              className="button"
              style={{ marginTop: "30px", marginRight: "10px" }}
            >
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button"
              style={{
                marginTop: "30px",
                backgroundColor: "#e8f3ff",
                color: "#1b64da",
              }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
