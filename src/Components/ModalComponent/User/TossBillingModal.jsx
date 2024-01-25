import { useEffect, useRef, useState } from "react";
import { loadBrandPay } from '@tosspayments/brandpay-sdk';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function TossBillingModal() {
    const brandPayRef = useRef(null);
    const clientKey = 'test_ck_ALnQvDd2VJ2NP9RnO90aVMj7X41m'; 
    const customerKey = 'ZXoy5kbGuUVputRZkFcGr'; // 내 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID


  useEffect(() => {
    (async () => {
        const brandPay = await loadBrandPay(clientKey, customerKey, {
            redirectUrl: 'http://localhost:3000/tossBilling',
            ui: {
                highlightColor: '#26C2E3',
                buttonStyle: 'full',
                labels: {
                    oneTouchPay: '내 상점 원터치결제',
                },
            },
        });

        if (brandPayRef.current == null) {
            brandPayRef.current = brandPay;
          }
        
        brandPay.addPaymentMethod('카드');
        
        brandPay.requestAgreement("빌링");


    })();

    
  }, []);

//결제요청
const handlePaymentClick = async () => {
    const paymentWidget = brandPayRef.current;

    try {
    /**
     * 결제 요청
     * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
     */
    await paymentWidget?.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        successUrl: window.location.origin + "/payment/paymentSuccess?paymentId=1", //paymentId파라메타는 추후 payment_id값을 받아서 1과 교체
        failUrl: window.location.origin + "/payment/paymentFailure"
    });
    } catch (error) {
    // TODO: 에러 처리
    }
};

  return (
    <div>
      <button className="btn primary w-100"  onClick={handlePaymentClick}>
            결제하기
        </button>
    </div>
  );
}

export default TossBillingModal;
