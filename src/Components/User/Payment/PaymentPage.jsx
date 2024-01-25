import React, { useEffect  } from "react";
import { useModalContext } from '../../Context/ModalContext';
import TossPaymentModal from '../../ModalComponent/User/TossPaymentModal';
import TossBillingModal from '../../ModalComponent/User/TossBillingModal';

function PaymentPage() {
  const modalContext = useModalContext();

  // 토스 페이먼츠 모달 호출
  const openTossPaymentModal = () => {
    // 토스 페이먼츠 모달창
    const tossPaymentModalContent = (
      <TossPaymentModal/>
    );
    modalContext.openModal(tossPaymentModalContent, "결재하기");
  };

  // 토스 자동결제 모달 호출
  const openTossBillingModal = () => {
    // 토스 자동결제 모달창
    const tossBillingModalContent = (
      <TossBillingModal/>
    );
    modalContext.openModal(tossBillingModalContent, "자동결제");
  };

  useEffect(() => {
  }, []);

  return (
    <div className="payment-container">
      <h1>결제 페이지</h1>
      <button onClick={openTossPaymentModal}>결제하기</button>
      <button onClick={openTossBillingModal}>자동결제</button>
    </div>
  );
}

export default PaymentPage;
