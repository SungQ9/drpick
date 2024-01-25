import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import InquiryModal from '../../ModalComponent/InquiryModal';
import PatientDetailModal from '../../ModalComponent/Doctor/PatientDetailModal';
import SimpleSlider from '../Carousel';
import PillReceiveModal from '../../ModalComponent/DrugStore/PillReceiveModal';
import MemberProfileEdit from '../../ModalComponent/Admin/MemberProfileEdit';
import DoctorProfileEdit from '../../ModalComponent/Admin/DoctorProfileEdit';

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
          handleOpenModal(<DoctorProfileEdit />, '의사정보수정', 'modify');
        }}
      >
        회원가입 모달
      </button>
    </div>
  );
};

export default ModalOpen;
