// buttonHelpers.js
import React from "react";
import { useModalContext } from "../../Context/ModalContext";
import { useNavigate } from "react-router-dom";
import ImgModal from "../../ModalComponent/User/ImgModal";
import InquiryAnswerModal from "../../ModalComponent/Admin/InquiryAnswerModal";

const GenerateButtons = ({ status, item = {} }) => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  if (!status) {
    return null; // status 값이 없으면 null 반환
  }

  const handleOpenModal = (component, name) => {
    openModal(component, name);
  };

  switch (status) {
    case "UN":
      return (
        <button
          className="listBtn-mid"
          onClick={() =>
            navigate(`/clinic/room/${item.certificateNum}`, {
              state: { certificateNum: item.certificateNum },
            })
          }
        >
          진료실입장하기
        </button>
      );
    case "UY":
      return (
        <div>
          <button
            className="listBtn-short"
            onClick={() => handleOpenModal(<ImgModal />, "진단서")}
          >
            진단서
          </button>
          <button
            className="listBtn-short"
            onClick={() => handleOpenModal(<ImgModal />, "처방전")}
            style={{ background: "#AECCC8" }}
          >
            처방전
          </button>
        </div>
      );
    case "N":
      return (
        <button
          className="clinicSubBtn-mid"
          onClick={() => handleOpenModal(<InquiryAnswerModal />)}
          style={{ background: "#11c2ad" }}
        >
          답변대기
        </button>
      );
    case "Y":
      return (
        <button className="listBtn-mid" onClick={() => handleOpenModal()}>
          답변완료
        </button>
      );
    case "RN":
      return (
        <button
          className="listBtn-short"
          onClick={() => handleOpenModal()}
          style={{ background: "#11c2ad" }}
        >
          작성전
        </button>
      );
    case "RY":
      return (
        <button
          className="listBtn-short"
          onClick={() => handleOpenModal()}
          style={{ background: "#11c2ad" }}
        >
          수정
        </button>
      );
    default:
      return null;
  }
};

export default GenerateButtons;
