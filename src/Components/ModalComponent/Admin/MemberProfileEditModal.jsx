// 회원정보수정 모달
import React, { useState } from "react";
import Input from "../../Layout/Input";
import Address from "../../Layout/Address";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";

const MemberProfileEdit = ({ onClose, item = {} }) => {
  const { token, userEmail } = useTokenContext();
  // const [selectedName, setSelectedName] = useState("");
  const [address, setAddress] = useState({
    main: "",
    detail: "",
    subdetail: "",
  });
  const [memberId, setMemberId] = useState(item.memberId);
  const [memberBirth, setMemberBirth] = useState(item.memberBirth);
  const [memberName, setMemberName] = useState(item.memberName);
  const [memberEmail, setMemberEmail] = useState(item.memberEmail);
  const [memberTel, setMemberTel] = useState(item.memberTel);
  const [memberPwd, setMemberPwd] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberEmail: userEmail,
    },
  };

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const data = {
    memberId: memberId,
    memberName: memberName,
    memberEmail: memberEmail,
    memberPwd: memberPwd === "" ? "" : memberPwd,
    memberTel: memberTel,
    memberAddrMain: address.main,
    memberAddrDetail: address.detail,
    memberAddrSubdetail: address.subdetail,
  };

  const updateMemberInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/members/updateMemberInfo",
        data,
        config
      );

      const message = res.data.body.message;

      if (res.data.body) {
        alert(message);
        return;
      }

      console.log("수정된 정보 : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table id="signUpInputForm" className="signUpTable">
        <tr>
          <td colSpan={2}>
            <Input
              id="email"
              className="member_email"
              label="이메일"
              type="text"
              disabled="disabled"
              placeholder="　이메일형식"
              style={{ width: "500px" }}
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id="name"
              className="member_name"
              label="이름"
              type="text"
              placeholder="이름을 입력하세요"
              style={{ width: "500px" }}
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id="pwd"
              className="member_pwd"
              label="비밀번호"
              type="password"
              style={{ width: "500px" }}
              placeholder="　영어,숫자,특수문자를 포함한 8~20자 "
              minLength={8}
              maxLength={20}
              value={memberPwd}
              onChange={(e) => setMemberPwd(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id="tel"
              className="member_tel"
              label="전화번호"
              type="text"
              style={{ width: "500px" }}
              placeholder="　'-' 없이 입력하세요"
              value={memberTel}
              onChange={(e) => setMemberTel(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ width: "510px" }}>
            <Address
              onAddressSelect={handleAddressSelect}
              itemAddr={item.memberAddrMain}
              itemAddrDetail={item.memberAddrDetail}
              itemAddrSubdetail={item.memberAddrSubdetail}
            />
          </td>
        </tr>
      </table>
      <div className="modify-button">
        <button
          className="clinicSubBtn-short"
          style={{ background: "red", height: "50px" }}
        >
          제한
        </button>
        <button
          className="clinicSubBtn-mid"
          onClick={updateMemberInfo}
          style={{ background: "#11C2AD" }}
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

export default MemberProfileEdit;
