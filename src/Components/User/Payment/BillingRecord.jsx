import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTokenContext } from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom"; 

// 자동결제 카드 등록
function BillingRecord() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerKey = urlParams.get("customerKey");
  const authKey = urlParams.get("authKey");
  const { token, userAuth } = useTokenContext();
  const navigate = useNavigate();

  const [displayedCustomerKey, setDisplayedCustomerKey] = useState(customerKey);
  const [displayedAuthKey, setDisplayedAuthKey] = useState(authKey);

  useEffect(() => {
    setDisplayedCustomerKey(customerKey);
    setDisplayedAuthKey(authKey);

    window.history.replaceState({}, document.title, window.location.pathname);

    //빌링키 받아오기 위한 axios설정
    const axiosOptions = {
      method: "POST",
      url: "https://api.tosspayments.com/v1/billing/authorizations/issue",
      headers: {
        Authorization:
          "Basic dGVzdF9za19RYmdNR1p6b3J6NUE0a21COWRFbFZsNUUxZW00Og==",
        "Content-Type": "application/json",
      },
      data: {
        authKey: displayedAuthKey,
        customerKey: displayedCustomerKey,
      },
    };


    //빌링키 DB에 저장
    axios
      .request(axiosOptions)
      .then(function (response) {
        axios.put(
          "http://localhost:8080/payments/recordBillingKey",
          {
            billingKey: response.data.billingKey,
            customerKey: response.data.customerKey,
            memberCreditNum: response.data.card.number,
            memberId: localStorage.getItem("userId"),
            cardType: response.data.card.cardType,
            issuerCode: response.data.card.issuerCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [customerKey, authKey, displayedAuthKey, displayedCustomerKey, token]);

  const moveUserPaymentPage = () => {
    navigate("/user/payment"); 
  };

  return (
    <div className="billing-success-container">
      <h1>자동결제 카드 등록 성공</h1>
      <button onClick={moveUserPaymentPage}>등록된 카드 확인</button> 
    </div>
  );
}

export default BillingRecord;
