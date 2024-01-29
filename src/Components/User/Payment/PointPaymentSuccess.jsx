import { useLocation, useNavigate } from "react-router-dom";

function PointPaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="billing-success-container">
      <h1>결제에 성공하셨습니다</h1>
      <div className="payment-details">
        <p>
          <strong>결제 금액:</strong>{" "}
          {location.state ? location.state.amount : "N/A"} 원
        </p>
        <p>
          <strong>결제 수단:</strong> 포인트 결제
        </p>
        <button
          onClick={() => {
            navigate("/user/payment");
          }}
        >
          결제수단관리 페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default PointPaymentSuccess;
