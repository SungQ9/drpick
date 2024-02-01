// 의사 정보 수정 모달
import React, { useState } from 'react';
import axios from 'axios';
import { useModalContext } from '../../Context/ModalContext';
import { useTokenContext } from '../../Context/TokenContext';
import Input from '../../Layout/Input';
import Select from '../../Layout/Select';
import SearchHospitalModal from '../Doctor/SearchHospitalModal';
import useAlert from '../../Layout/Alert';

const DoctorProfileEdit = ({ onClose, item = {}, fetchData }) => {
  const { token, userEmail } = useTokenContext();
  // 이름, 진료과목, 소속병원, 전공
  const [doctorId, setDoctorId] = useState(item.doctorId || "");
  const [doctorName, setDoctorName] = useState(item.doctorName || "");
  const [doctorSubject, setDoctorSubject] = useState(item.doctorSubject || "");
  const [doctorMajor, setDoctorMajor] = useState(item.doctorMajor || "");
  const [hospitalName, setHospitalName] = useState(item.hospitalName || "");
  const showAlert = useAlert();
  const { openModal } = useModalContext();

  const handleOpenModal = (component, name, type) => {
    openModal(component, name, type);
  };
  const handleHospitalSelect = (doctorName) => {
    setHospitalName(doctorName);
  };

  const handleSubjectChange = (selectedOption) => {
    setDoctorSubject(selectedOption);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const doctorData = {
    doctorId: doctorId,
    doctorName: doctorName,
    doctorSubject: doctorSubject,
    hospitalName: hospitalName,
    doctorMajor: doctorMajor,
  };

  const updateDoctorInfo = async () => {
    try {
      // 의사 정보 업데이트
      const infoRes = await axios.post(
        "http://localhost:8080/admin/updateDoctorsInfo",
        doctorData,
        config
      );
      if (infoRes.status === 200) {
        const message = "의사정보수정 완료하였습니다.";
        await showAlert("정보수정 성공", message, "success");
        onClose();
        fetchData();
      } else {
        console.error(
          "의사 정보 업데이트 오류: 예상하지 못한 HTTP 상태 코드:",
          infoRes.status
        );
      }
    } catch (error) {
      console.error("의사 정보 업데이트 오류:", error);
    }
  };

  return (
    <div className="modify-content">
      <table
        id="signUpInputForm"
        className="profile-table"
        style={{
          borderCollapse: "separate",
          borderSpacing: "10px 10px",
          marginTop: "20px",
        }}
      >
        <tr>
          <td colSpan={2}>
            <Input
              id="doctor_name"
              className="member_name"
              label="이름"
              type="text"
              placeholder="이름을 입력하세요"
              style={{ width: "580px", height: "40px" }}
              value={doctorName}
              onChange={(e) => {
                setDoctorName(e.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Input
              id="doctor_subject"
              className="member_name"
              label="진료과목"
              type="text"
              value={doctorSubject}
              style={{ height: "40px" }}
            />
          </td>
          <td style={{ verticalAlign: "bottom" }}>
            <Select
              options={[
                { value: "가정의학과", label: "가정의학과" },
                { value: "내과", label: "내과" },
                { value: "마취통증과", label: "마취통증과" },
                { value: "비뇨기과", label: "비뇨기과" },
                { value: "산부인과", label: "산부인과" },
                { value: "성형외과", label: "성형외과" },
                { value: "소아과", label: "소아과" },
                { value: "피부과", label: "피부과" },
                { value: "신경외과", label: "신경외과" },
                { value: "안과", label: "안과" },
                { value: "영상의학과", label: "영상의학과" },
                { value: "외과", label: "외과" },
                { value: "이비인후과", label: "이비인후과" },
                { value: "치과", label: "치과" },
              ]}
              style={{ width: "100%", height: "45px" }}
              onChange={(e) => handleSubjectChange(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Input
              id="doctor_hospital"
              className="member_name"
              label="소속병원"
              type="text"
              placeholder="이름을 입력하세요"
              value={hospitalName}
              style={{ height: "40px" }}
            />
          </td>
          <td style={{ verticalAlign: "bottom" }}>
            <button
              style={{
                width: "100%",
                height: "44px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(
                  <SearchHospitalModal
                    onHospitalSelect={handleHospitalSelect}
                  />,
                  "병원검색",
                  "Search"
                );
              }}
            >
              병원검색
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id="doctor_major"
              className="member_name"
              label="전공"
              type="text"
              value={doctorMajor}
              style={{ width: "580px", height: "40px" }}
              onChange={(e) => {
                setDoctorMajor(e.target.value);
              }}
            />
          </td>
        </tr>
      </table>
      <div
        id="doctor_worktime"
        className="profile-bottom"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
      </div>
      <div className="modify-button">
        <button
          className="clinicSubBtn-mid"
          style={{ background: "#11C2AD" }}
          onClick={updateDoctorInfo}
        >
          저장
        </button>
        <button className="clinicSubBtn-mid" onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};
export default DoctorProfileEdit;
