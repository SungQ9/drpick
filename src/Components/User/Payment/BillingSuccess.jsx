import React, { useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useLocation, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";

function BillingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userAuth } = useTokenContext();

  const encodedBillingData = location.state?.responseData;
  const billingData = encodedBillingData
    ? JSON.parse(decodeURIComponent(encodedBillingData))
    : null;

  useEffect(() => {
    const completePayment = async () => {
      if (!billingData) {
        navigate("/payment/Failure");
        return;
      }

      try {
        await axios.put(
          "http://localhost:8080/payments/completePayment",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              paymentId: billingData.paymentId,
              transactionType: "CARD",
            },
          }
        );
      } catch (error) {
        console.error("에러: ", error);
        navigate("/payment/Failure");
      }
    };
    completePayment();
  }, [billingData, navigate, token]);

  if (!billingData) {
    return (
      <div className="billing-success-container">
        결제 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const formatCardNumber = (number) => {
    const segments = [];
    let segment = "";

    for (let char of number) {
      segment += char;
      if (segment.length === 4 || (char === "*" && segment.length > 4)) {
        segments.push(segment);
        segment = "";
      }
    }

    if (segment) {
      segments.push(segment); // Add the last segment if there's any remainder
    }

    return segments.join("-");
  };

  return (
    <div
      className="billing-success-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: "0" }}>결제에 성공하셨습니다</h1>
        <div className="payment-details">
          <p style={{ marginBottom: "10px" }}>
            <strong>결제 금액:</strong>{" "}
            {billingData.totalAmount.toLocaleString()} 원
          </p>
          <p>
            <strong>결제 수단:</strong> {billingData.method}
          </p>
          <p>
            <strong>카드 타입:</strong> {billingData.card.cardType}
          </p>
          <p>
            <strong>카드 번호:</strong>{" "}
            {formatCardNumber(billingData.card.number)}
          </p>
          <button
            onClick={() => {
              navigate("/user/payment");
            }}
            style={{ width: "150px", height: "50px" }}
          >
            결제수단관리 <br/>
            페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingSuccess;
