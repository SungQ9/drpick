import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTokenContext } from "../../Context/TokenContext";

function BillingRecord() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerKey = urlParams.get("customerKey");
  const authKey = urlParams.get("authKey");
  const { token, userAuth } = useTokenContext();

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
        const billingKey = response.data.billingKey;
        const customerKey = response.data.customerKey;
        console.log("키: ", billingKey, customerKey);
        axios.put("http://localhost:8080/payments/recordBillingKey", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            billingKey: billingKey,
            customerKey: customerKey,
            memberId: localStorage.getItem("userId"),
          },
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [customerKey, authKey, displayedAuthKey, displayedCustomerKey, token]);

  return (
    <div className="billing-success-container">
      <h1>자동결제 카드 등록 성공</h1>
    </div>
  );
}

export default BillingRecord;
