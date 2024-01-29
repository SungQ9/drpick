// 포인트충전
import card from "../../../img/card-icon.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "../../Context/TokenContext";
import { useModalContext } from "../../Context/ModalContext";
import TossPaymentModal from "../../ModalComponent/User/TossPaymentModal";

const ChargePoint = () => {
  const [memberPoint, setMemberPoint] = useState("");
  const { token, userAuth } = useTokenContext();
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchPointData = async () => {
      try {
        // 포인트 조회
        const pointCheck = await axios.get(
          "http://localhost:8080/members/getMemberInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              memberId: localStorage.getItem("userId"),
              memberEmail: localStorage.getItem("userEmail"),
            },
          }
        );

        const formattedPoint = new Intl.NumberFormat("ko-KR", {
          style: "decimal",
        }).format(pointCheck.data.memberPoint);
        setMemberPoint(formattedPoint);
      } catch (err) {
        console.error("마이페이지 에러 :", err);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      }
    };

    fetchPointData();
  }, [token]);

  //포인트 충전 결제창
  const handleChargeClick = (pointValue) => {
    let chargeAmount = pointValue;

    if (pointValue === "직접입력") {
      chargeAmount = prompt("충전할 포인트를 입력하세요:", "");
      if (!chargeAmount || isNaN(chargeAmount) || chargeAmount <= 0 || chargeAmount % 100 !== 0) {
        alert("유효한 포인트를 입력하세요");
        return;
      }
    }

    const confirmCharge = window.confirm(`${new Intl.NumberFormat("ko-KR").format(chargeAmount)}P 충전 하시겠습니까?`);
    if (confirmCharge) {
      const tossPaymentModalContent = <TossPaymentModal amount={chargeAmount} orderName="포인트 충전" />;
      modalContext.openModal(tossPaymentModalContent, "결재하기");
    }
  };

  return (
    <div className="shortForm">
      <div id="paymentTitle">
        <h2>포인트충전</h2>
      </div>
      <div className="paymentBody">
        <h3>포인트충전</h3>
        <div id="pointDetail">
          {" "}
          포인트내역 <span>{memberPoint}P</span>
        </div>
        <h3 style={{ color: "#000000" }}>충전수단선택</h3>
        <img src={card} alt="card" />
        <h3>신용/체크카드</h3>
        <table id="priceBtnTable">
          <tr>
            <td onClick={() => handleChargeClick("1000")}>1,000P</td>
            <td onClick={() => handleChargeClick("3000")}>3,000P</td>
            <td onClick={() => handleChargeClick("5000")}>5,000P</td>
          </tr>
          <tr>
            <td onClick={() => handleChargeClick("10000")}>10,000P</td>
            <td onClick={() => handleChargeClick("30000")}>30,000P</td>
            <td onClick={() => handleChargeClick("직접입력")}>직접입력</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ChargePoint;
