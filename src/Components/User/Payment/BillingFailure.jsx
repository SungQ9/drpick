import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BillingFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/payment/billingFailure", { replace: true });
  }, []);

  return (
    <div className="billing-failure-container">
      <h1>잘못된 접속 경로</h1>
      <p>잘못된 접속 경로입니다.</p>
    </div>
  );
}

export default BillingFailure;
