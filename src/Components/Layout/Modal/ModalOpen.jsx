import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import MemberProfileEditModal from '../../ModalComponent/Admin/MemberProfileEditModal';
import DoctorRequestModal from '../../ModalComponent/Admin/DoctorRequestModal';
import HospitalEditModal from '../../ModalComponent/Admin/HospitalEditModal';
import DrugstoreEditModal from '../../ModalComponent/Admin/DrugstoreEditModal';
import InquiryAnswerModal from '../../ModalComponent/Admin/InquiryAnswerModal';

const ModalOpen = ({ onClick, componentName }) => {
  const { openModal } = useModalContext();

  const handleOpenModal = (component, name) => {
    openModal(component, name);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleOpenModal(<HospitalEditModal type={''} />, '병원추가');
        }}
      >
        병원추가
      </button>
      <button
        onClick={() => {
          handleOpenModal(
            <HospitalEditModal type={'modify'} />,
            '병원정보수정',
          );
        }}
      >
        병원정보수정
      </button>
      <button
        onClick={() => {
          handleOpenModal(<DrugstoreEditModal />, '약국추가');
        }}
      >
        약국추가
      </button>
      <button
        onClick={() => {
          handleOpenModal(
            <DrugstoreEditModal type={'modify'} />,
            '약국정보수정',
          );
        }}
      >
        약국정보수정
      </button>
      <button
        onClick={() => {
          handleOpenModal(<InquiryAnswerModal />, '답변하기');
        }}
      >
        답변하기
      </button>
    </div>
  );
};

export default ModalOpen;
