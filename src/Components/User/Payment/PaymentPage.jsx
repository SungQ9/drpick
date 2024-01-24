import React, { useEffect  } from "react";
import { useModalContext } from '../../Context/ModalContext';
import TossPaymentModal from '../../ModalComponent/User/TossPaymentModal';

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

  useEffect(() => {
  }, []);

  return (
    <div className="payment-container">
      <h1>결제 페이지</h1>
      <button onClick={openTossPaymentModal}>결재하기</button>
    </div>
  );
}

export default PaymentPage;
