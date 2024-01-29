import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function TossPaymentModal({amount, orderName}) {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget("test_ck_ALnQvDd2VJ2NP9RnO90aVMj7X41m",  ANONYMOUS); 

      if (paymentWidgetRef.current == null) {
        paymentWidgetRef.current = paymentWidget;
      }

      const paymentMethodsWidget = paymentWidgetRef.current.renderPaymentMethods(
        "#payment-method",
        { value: amount },
        { variantKey: "DEFAULT" }
      );
      
      agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement('#agreement', { variantKey: 'DEFAULT' });

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [amount]);

  //결제요청
  const handlePaymentClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: generateRandomString(),
        orderName: orderName,
        customerName: localStorage.getItem("userName"),
        customerEmail: localStorage.getItem("userEmail"),
        successUrl: window.location.origin + "/payment/chargePoint", 
        failUrl: window.location.origin + "/payment/Failure"
      });
    } catch (error) {
      // TODO: 에러 처리
    }
  };

  return (
    <div className="wrapper w-100" style={{ width: '800px', height: '600px' }}>
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button className="btn primary w-100"  onClick={handlePaymentClick}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TossPaymentModal;
