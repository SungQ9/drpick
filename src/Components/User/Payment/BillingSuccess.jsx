import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BillingSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/payment/billingSuccess", { replace: true });
  }, []);

  return (
    <div className="billing-success-container">
      <h1>자동결제 성공</h1>
      <p>자동결제 성공</p>
    </div>
  );
}

export default BillingSuccess;
