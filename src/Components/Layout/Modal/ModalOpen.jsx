import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import InquiryModal from '../../ModalComponent/InquiryModal';
import PatientDetailModal from '../../ModalComponent/Doctor/PatientDetailModal';

const ModalOpen = ({ onClick, componentName }) => {
  const { openModal } = useModalContext();

  const handleOpenModal = (component, name) => {
    openModal(component, name);
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log('로그인버튼클릭');
          handleOpenModal(<PatientDetailModal />, '환자상세');
        }}
      >
        로그인 모달
      </button>
      <button
        onClick={() => {
          console.log('회원가입버튼클릭');
          handleOpenModal(<InquiryModal />, '1:1 문의');
        }}
      >
        회원가입 모달
      </button>
    </div>
  );
};

export default ModalOpen;
