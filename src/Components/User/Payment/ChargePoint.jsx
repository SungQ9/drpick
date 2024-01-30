import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"; 
import { useTokenContext } from '../../Context/TokenContext';

export function ChargePoint() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useTokenContext();
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    if (isProcessed) {
      return;
    }

    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");

    if (!orderId || !amount || !paymentKey) {
      console.error("쿼리 페라미터 없음");
      navigate(`/payment/Failure`);
      return;
    }

    const requestData = { orderId, amount, paymentKey };
    const secretKey = "test_sk_QbgMGZzorz5A4kmB9dElVl5E1em4";
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      requestData,
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('토스결제 확인 받아오기 실패');
      }
      setIsProcessed(true);
      
      return chargePoint(amount, response.data.requestedAt);
    })
    .then(() => {
      navigate("/payment/ChargePoint", { replace: true });
    })
    .catch((error) => {
      console.error("에러:", error);
      navigate(`/payment/Failure`);
    });
  }, [searchParams, token, navigate, isProcessed]);

  const chargePoint = (amount, transactionDate) => {
    return axios.post(
      "http://localhost:8080/payments/chargePoint",
      {
        memberId: localStorage.getItem("userId"),
        transactionType: "CARD",
        amount: amount,
        transactionDate: transactionDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  const moveUserPaymentPage = () => {
    navigate("/user/payment");
  };

  return (
    <div className="result wrapper">
      <div className="box_section">
        <div>
          <h2 style={{ padding: "20px 0px 10px 0px" }}>포인트 충전 성공</h2>
        </div>
        <div className="result wrapper">
          <button onClick={moveUserPaymentPage}>결재수단관리 페이지로 이동</button>
        </div>
      </div>
    </div>
  );
}

export default ChargePoint;
