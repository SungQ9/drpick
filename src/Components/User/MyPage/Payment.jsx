// 결제수단등록
import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../../../img/back-arrow-icon.png";
import card from "../../../img/card-icon.png";

const Payment = () => {
  const navigate = useNavigate();
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
            <td style={{ height: "100px" }}>카드추가</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Payment;
