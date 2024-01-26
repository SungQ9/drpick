import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import MemberProfileEditModal from '../../ModalComponent/Admin/MemberProfileEditModal';
import DoctorRequestModal from '../../ModalComponent/Admin/DoctorRequestModal';
import DoctorProfileEditModal from '../../ModalComponent/Admin/DoctorProfileEditModal';
import HospitalEditModal from '../../ModalComponent/Admin/HospitalEditModal';
import DrugstoreEditModal from '../../ModalComponent/Admin/DrugstoreEditModal';
import InquiryAnswerModal from '../../ModalComponent/Admin/InquiryAnswerModal';
import PatientDetailModal from '../../ModalComponent/Doctor/PatientDetailModal';
import PillReceiveModal from '../../ModalComponent/DrugStore/PillReceiveModal';
import ImgModal from '../../ModalComponent/User/ImgModal';
import ReviewModal from '../../ModalComponent/User/ReviewModal';
import TossBillingModal from '../../ModalComponent/User/TossBillingModal';
import TossPaymentModal from '../../ModalComponent/User/TossPaymentModal';

const ModalOpen = ({ onClick, componentName }) => {
  const { openModal } = useModalContext();

  const handleOpenModal = (component, name) => {
    openModal(component, name);
  };

  return (
    <div>
      <div style={{ marginBottom: '50px', marginTop: '50px' }}>
        사용자
        <button
          onClick={() => {
            handleOpenModal(<ImgModal />, '진단서');
          }}
        >
          진단서
        </button>
        <button
          onClick={() => {
            handleOpenModal(<ImgModal />, '처방전');
          }}
        >
          처방전
        </button>
        <button
          onClick={() => {
            handleOpenModal(<ReviewModal />, '리뷰');
          }}
        >
          리뷰
        </button>
        <button
          onClick={() => {
            handleOpenModal(<TossPaymentModal />, '토스');
          }}
        >
          토스
        </button>
        <button
          onClick={() => {
            handleOpenModal(<TossBillingModal />, '토스');
          }}
        >
          토스
        </button>
      </div>
      <div style={{ marginBottom: '50px' }}>
        의사,약국
        <button
          onClick={() => {
            handleOpenModal(<PatientDetailModal />, '환자상세');
          }}
        >
          환자상세
        </button>
        <button
          onClick={() => {
            handleOpenModal(<PillReceiveModal />, '수령확인');
          }}
        >
          수령확인
        </button>
      </div>
      <div>
        관리자
        <button
          onClick={() => {
            handleOpenModal(
              <MemberProfileEditModal type={''} />,
              '회원정보수정',
            );
          }}
        >
          회원정보수정
        </button>
        <button
          onClick={() => {
            handleOpenModal(<DoctorProfileEditModal />, '의사정보수정');
          }}
        >
          의사정보수정
        </button>
        <button
          onClick={() => {
            handleOpenModal(<DoctorRequestModal />, '상세보기');
          }}
        >
          등록요청상세
        </button>
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
    </div>
  );
};

export default ModalOpen;
