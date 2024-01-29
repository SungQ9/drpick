import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";

// 자동결제 토스에 요청
function PointPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userAuth } = useTokenContext();

  //포인트 결재진행
  useEffect(() => {
    const { amount, paymentId } = location.state || {};

    if (!amount || !paymentId) {
      navigate("/payment/Failure");
      return;
    }

    // 회원정보 불러오기
    axios
      .get("http://localhost:8080/payments/getUserPaymentMethodAmount", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          memberId: localStorage.getItem("userId"),
        },
      })
      .then(function (response) {
        const data = response.data;

        // DB에 포인트 결제 진행
        axios
          .put(
            "http://localhost:8080/payments/payPoints",
            {
              memberId: localStorage.getItem("userId"),
              transactionType: "POINT",
              amount: -amount, //결제를 위해서 음수처리
              transactionDate: new Date().toISOString(),
              paymentId: paymentId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function (response) {
            navigate(`/payment/PointPaymentSuccess`, { state: { amount: amount } });
          })
      })
      .catch((error) => {
        console.error("에러:", error);
        navigate(`/payment/Failure`);
      });
  }, [location, navigate, token]);

  return (
    <div>결제성공</div>
  );
}

export default PointPayment;
