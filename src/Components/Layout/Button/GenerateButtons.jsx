// buttonHelpers.js
import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import { useNavigate } from 'react-router-dom';
import ImgModal from '../../ModalComponent/User/ImgModal';
import InquiryAnswerModal from '../../ModalComponent/Admin/InquiryAnswerModal';
import PillReceiveModal from '../../ModalComponent/DrugStore/PillReceiveModal';

const GenerateButtons = ({ status, item = {}, fetchData }) => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  if (!status) {
    return null; // status 값이 없으면 null 반환
  }

  const handleOpenModal = (component, name) => {
    openModal(component, name);
  };

  switch (status) {
    case 'UN': // 환자 진료목록조회 상태
      return (
        <button
          className='listBtn-mid'
          onClick={() =>
            navigate(`/clinic/room/${item.certificateNum}`, {
              state: { certificateNum: item.certificateNum },
            })
          }
        >
          진료실입장하기
        </button>
      );
    case 'UY': // 환자 진료목록조회 상태
      return (
        <div>
          <button
            className='listBtn-short'
            onClick={() => handleOpenModal(<ImgModal />, '진단서')}
          >
            진단서
          </button>
          <button
            className='listBtn-short'
            onClick={() => handleOpenModal(<ImgModal />, '처방전')}
            style={{ background: '#AECCC8' }}
          >
            처방전
          </button>
        </div>
      );
    case 'UC':
      return <div>진료 취소</div>;
    case 'N': // 문의목록 상태
      return (
        <button
          className='clinicSubBtn-mid'
          onClick={() =>
            handleOpenModal(
              <InquiryAnswerModal
                item={item}
                type={'user'}
                fetchData={fetchData}
              />,
              '문의',
            )
          }
          style={{ background: '#11c2ad' }}
        >
          답변대기
        </button>
      );
    case 'Y': // 문의목록 상태
      return (
        <button
          className='clinicSubBtn-mid'
          onClick={() =>
            handleOpenModal(
              <InquiryAnswerModal
                item={item}
                type={'user'}
                fetchData={fetchData}
              />,
              '문의',
            )
          }
        >
          답변완료
        </button>
      );
    case 'RN': // 사용자 리뷰 상태
      return (
        <button
          className='listBtn-short'
          onClick={() => handleOpenModal()}
          style={{ background: '#11c2ad' }}
        >
          작성전
        </button>
      );
    case 'RY': // 사용자 리뷰 상태
      return (
        <button
          className='listBtn-short'
          onClick={() => handleOpenModal()}
          style={{ background: '#11c2ad' }}
        >
          수정
        </button>
      );
    case 'DN': // 약국 수령  상태
      return (
        <button
          className='listBtn-mid'
          style={{ width: '100px' }}
          onClick={() =>
            handleOpenModal(
              <PillReceiveModal
                item={item}
                type={'update'}
                fetchData={fetchData}
              />,
              '수령확인',
            )
          }
        >
          수령확인
        </button>
      );
    case 'DY': // 약국 수령  상태
      return (
        <button
          className='listBtn-mid'
          onClick={() =>
            handleOpenModal(
              <PillReceiveModal item={item} fetchData={fetchData} />,
              '수령확인',
            )
          }
          style={{ background: '#AECCC8', color: '#ACACAC', width: '100px' }}
        >
          수령완료
        </button>
      );
    default:
      return null;
  }
};

export default GenerateButtons;
