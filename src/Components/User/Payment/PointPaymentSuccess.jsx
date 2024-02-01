import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PointPaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    // 전체 컨테이너
    <div className="billing-success-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        {/* 결제 성공 메시지 */}
        <h1 style={{ marginTop: "0" }}>결제에 성공하셨습니다</h1>
        <div className="payment-details">
          <p style={{ marginBottom: "10px" }}>
            {/* 결제 금액 라벨 */}
            <strong>결제 금액: </strong>
            {/* 결제 금액 (동적 데이터) */}
            {location.state ? location.state.amount : "N/A"} 원
          </p>
          <p style={{ marginTop: "10px", marginBottom: "20px" }}>
            {/* 결제 수단 라벨 */}
            <strong>결제 수단:</strong>
            {/* 결제 수단: 포인트 결제 */}
            포인트 결제
          </p>
          <button
            onClick={() => {
              navigate("/user/payment");
            }}
            style={{ width: "150px", height: "50px" }}
          >
            {/* 결제수단관리 페이지로 이동 버튼 */}
            결제수단관리 <br />
            페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointPaymentSuccess;
