import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/payment/failure", { replace: true });
  }, []);

  return (
    <div className="payment-failure-container">
      <h1>결재 실패</h1>
      <p>결재에 실패했습니다.</p>
    </div>
  );
}

export default PaymentFailure;
