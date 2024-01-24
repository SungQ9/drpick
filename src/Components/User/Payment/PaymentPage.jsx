import React, { useEffect, useState } from "react";
import { useModalContext } from '../../Context/ModalContext';
import TossPaymentModal from '../../ModalComponent/User/TossPaymentModal';

function PaymentPage() {
  const [paymentAmount, setPaymentAmount] = useState(0);
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
    setPaymentAmount(10000); // 결제금액 입력 (샘플, 추후 삭제)
  }, []);

  return (
    <div className="payment-container">
      <h1>결제 페이지</h1>
      <p>결재 금액: {paymentAmount}원</p>
      <button onClick={openTossPaymentModal}>결재하기</button>
    </div>
  );
}

export default PaymentPage;
