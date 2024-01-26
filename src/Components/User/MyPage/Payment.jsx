// 결제수단등록
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import back from "../../../img/back-arrow-icon.png";
import card from "../../../img/card-icon.png";
import { useModalContext } from "../../Context/ModalContext";
import TossBillingModal from "../../ModalComponent/User/TossBillingModal";
import { useTokenContext } from "../../Context/TokenContext";

const Payment = () => {
  const navigate = useNavigate();
  const modalContext = useModalContext();
  const { token, userAuth } = useTokenContext();

  // 토스 자동결제 카드등록 모달 호출
  const openTossBillingModal = () => {
    const response = axios.get("http://localhost:8080/payments/getUserPaymentMethodAmount", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        memberId: localStorage.getItem("userId"),
      },
    })
    
    const tossBillingModalContent = <TossBillingModal />;
    modalContext.openModal(tossBillingModalContent, "자동결제");
  };

  return (
    <div className="shortForm">
      <div id="paymentTitle" style={{ justifyContent: "unset " }}>
        <img
          className="backIcon"
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt="back"
        />
        <h2>결제수단등록</h2>
      </div>
      <div className="paymentBody">
        <h3>신용/체크카드</h3>
        <img src={card} alt="card" />
        <h3>카드를 등록해주세요</h3>
        <table id="priceBtnTable">
          <tr>
            <td style={{ height: "100px" }} onClick={openTossBillingModal}>
              카드추가
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Payment;
