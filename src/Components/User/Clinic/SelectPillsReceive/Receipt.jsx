import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctor from "../../../../img/doctor-icon.png";
import hospital from "../../../../img/hospital-icon.png";

//임시로 paymentId를 1로 설정, 추후 paymentId값을 넘기도록 수정
//추후 포인트결제/카드결제 값 받아오기

const Receipt = ({ selectedPrice }) => {
  const [price, setPrice] = useState(0); // 기존의 price 상태 (기본값 0으로 설정)
  const [totalPrice, setTotalPrice] = useState(0); // 최종 가격을 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    setPrice(2600);
    // selectedPrice와 price를 더합니다.
    setTotalPrice(price + selectedPrice);
  }, [selectedPrice, price]);

  // 숫자를 천 단위 구분 문자열로 변환하는 함수
  const formatPrice = (price) => {
    return price.toLocaleString("ko-KR");
  };

  // (카드결제 선택시)결제하기 버튼 클릭시 전체 값을 자동결제 페이지(User/Payment/BillingCharge.jsx) 넘기기
  const handlePaymentClick = () => {
    if (window.confirm("결제를 진행하시겠습니까?")) {
      //임시로 paymentId를 1로 설정, 추후 paymentId값을 넘기도록 수정

      //카드결제
      /*
      navigate("/payment/billingCharge", {
        state: { amount: totalPrice, paymentId: 1 },
      });
      */

      //포인트결제
      navigate("/payment/pointPayment", {
        state: { amount: totalPrice, paymentId: 1 },
      });
    }
  };

  // (포인트결제 선택시)

  return (
    <div className="receipt-main">
      <div className="receipt-title">
        <h1>결제정보</h1>
      </div>
      <div className="receipt-bill">
        <h3 style={{ marginBottom: "0px" }}>진료비</h3>
        <div className="receipt-bill-price">
          <h1 style={{ marginTop: "0px" }}>{formatPrice(totalPrice)}</h1>
          <h2 style={{ marginLeft: "10px", marginTop: "0px" }}>원</h2>
        </div>
      </div>
      <div className="receipt-info">
        <ul style={{ listStyle: "none", position: "relative", right: "45px" }}>
          <li>
            <img src={doctor} alt="doctor" />
            <h2>의사정보</h2>
          </li>
          <li style={{ marginTop: "50px" }}>
            <img src={hospital} alt="hospital" />
            <h2>병원정보</h2>
          </li>
        </ul>
      </div>
      <div className="receipt-pay">
        <button
          className="clinicBtn-long"
          style={{ width: "350px" }}
          onClick={handlePaymentClick}
        >
          결제하기 & 배송시작{" "}
        </button>
      </div>
    </div>
  );
};

export default Receipt;
