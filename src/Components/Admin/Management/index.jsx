import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";
import headers from "../../SampleData/Headers";
import ListTitle from "../../Layout/List/ListTitle";
import List from "../../Layout/List";
import Loading from "../../User/ImageSearch/Loading";
import { response } from "express";

const InquiryManage = () => {
  const location = useLocation();
  const { token, userAuth } = useTokenContext();
  const selectedType = location.state?.selectedType || "default";
  const [title, setTitle] = useState("");
  const [items, setItems] = useState();
  const [currentHeaders, setCurrentHeaders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberId: localStorage.getItem("userId"),
    },
  };

  const fetchInquiryData = async (apiEndpoint, headers, titleKey) => {
    setIsLoading(true);

    try {
      const response = await axios.get(apiEndpoint, config);
      const convertedItems = response.data.map((item) => {
        // inquiryType에 따라 한글로 변환
        item.inquiryType = convertInquiryType(item.inquiryType);
        return item;
      });
      setItems(response.data);
      setCurrentHeaders(headers);
      setTitle(titleKey);
    } catch (err) {
      console.error("데이터 요청 에러:", err);
      // 에러 발생 시 대체 데이터 설정 가능
    } finally {
      setIsLoading(false);
    }
  };

  const convertInquiryType = (inquiryType) => {
    switch (inquiryType) {
      case "Q":
        return "이용문의";
      case "C":
        return "진료문의";
      case "P":
        return "결제문의";
      case "D":
        return "배송문의";
      default:
        return "기타";
    }
  };

  useEffect(() => {
    switch (selectedType) {
      case "user":
        fetchInquiryData(
          "http://localhost:8080/admin/getMemberList",
          headers.members,
          "회원관리"
        );
        break;
      case "doctor":
        fetchInquiryData(
          "http://localhost:8080/admin/getDoctorsList",
          headers.doctors,
          "의사관리"
        );
        break;
      case "request":
        fetchInquiryData(
          "http://localhost:8080/admin/getRegistRequestList",
          headers.requestDoctors,
          "등록요청목록"
        );
        break;
      case "hospital":
        fetchInquiryData(
          "http://localhost:8080/admin/getHospitalList",
          headers.hospitals,
          "병원관리"
        );
        break;
      case "drugstore":
        fetchInquiryData(
          "http://localhost:8080/admin/getDrugstoreList",
          headers.drugstores,
          "약국관리"
        );
        break;
      case "userInquiry":
        fetchInquiryData(
          "http://localhost:8080/admin/getMemberInquiryList",
          headers.inquiry,
          "회원 문의"
        );
        break;
      case "doctorInquiry":
        fetchInquiryData(
          "http://localhost:8080/admin/getDoctorInquiryList",
          headers.inquiry,
          "의사 문의"
        );
        break;
      case "drugstoreInquiry":
        fetchInquiryData(
          "http://localhost:8080/admin/getDrugstoreInquiryList",
          headers.inquiry,
          "약국 문의"
        );
        break;
      default:
        setIsLoading(false);
        break;
    }
  }, [selectedType, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="listWrapper">
      <ListTitle title={title} />
      {/* 회원 관리 (selectedType === 'user') */}
      {selectedType === "user" && (
        <List
          headers={currentHeaders}
          items={items}
          listbutton={"수정"}
          listType={"user"}
          buttonType={"N"}
        />
      )}

      {/* 의사 관리 (selectedType === 'doctor') */}
      {selectedType === "doctor" && (
        <List
          headers={currentHeaders}
          items={items}
          listbutton={"수정"}
          listType={"doctor"}
          buttonType={"N"}
        />
      )}

      {/*의사 등록요청 */}
      {selectedType === "request" && (
        <List
          headers={currentHeaders}
          items={items}
          listbutton={"상세보기"}
          buttonType={"N"}
        />
      )}
      {/*병원관리 */}
      {selectedType === "hospital" && (
        <List
          headers={currentHeaders}
          items={items}
          buttonType={"Y"}
          buttonName={"추가"}
          listbutton={"수정"}
          listType={"hospital"}
        />
      )}
      {/*약국관리 */}
      {selectedType === "drugstore" && (
        <List
          headers={currentHeaders}
          items={items}
          buttonType={"Y"}
          buttonName={"추가"}
          listbutton={"수정"}
          listType={"drugstore"}
        />
      )}

      {/*문의관리 */}
      {(selectedType === "userInquiry" ||
        selectedType === "doctorInquiry" ||
        selectedType === "drugstoreInquiry") && (
        <List headers={currentHeaders} items={items} type={"Date"} />
      )}
    </div>
  );
};

export default InquiryManage;
