import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 자동결제 성공
function BillingSuccess() {
  const location = useLocation();
  const billingDataParam = new URLSearchParams(location.search).get("billingData");
  const billingData = billingDataParam ? JSON.parse(decodeURIComponent(billingDataParam)) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!billingData) {
      navigate("/payment/billingFailure");
    } else {

    
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [billingData, navigate]);

  if (!billingData) {
    return (
      <div className="billing-success-container">
        <h1>잘못된 경로</h1>
        <p>잘못된 경로입니다.</p>
      </div>
    );
  }

  return (
    <div className="billing-success-container">
      <h1>자동결제 성공</h1>
      <div>
        <h2>자동결제 결과</h2>
        <pre>{JSON.stringify(billingData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default BillingSuccess;
