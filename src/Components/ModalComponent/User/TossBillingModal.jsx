import React, { useEffect } from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { v4 as uuidv4 } from "uuid";
import { useModalContext } from "../../Context/ModalContext"; 

const clientKey = "test_ck_ALnQvDd2VJ2NP9RnO90aVMj7X41m";
  
export function TossBillingModal() {
  const modalContext = useModalContext();

  useEffect(() => {
    modalContext.closeModal();
    const customerKey = uuidv4();
    loadTossPayments(clientKey)
      .then((tossPayments) => {
        tossPayments
          .requestBillingAuth("카드", {
            customerKey: customerKey,
            successUrl: window.location.origin + "/payment/billingRecord",
            failUrl: window.location.origin + "/payment/Failure",
          })
          .catch(function (error) {
          });
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }, []);

  return <div />;
}

export default TossBillingModal;
