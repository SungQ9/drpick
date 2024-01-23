import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";
import headers from "../../SampleData/Headers";
import ListTitle from "../../Layout/List/ListTitle";
import List from "../../Layout/List";

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
      // 관리자쪽 userId 이름으로 수정
      memberId: localStorage.getItem("userId"),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // eslint-disable-next-line default-case
        switch (selectedType) {
          case "user":
            var response = await axios.get(
              "http://localhost:8080/admin/getMemberList",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("회원관리");
            break;
          case "doctor":
            var response = await axios.get(
              "http://localhost:8080/doctors/getDoctorsList",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("의사관리");
            break;
          case "request":
            var response = await axios.get(
              "http://localhost:8080/doctors/getRegistRequestList",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("등록요청목록");
            break;
          case "hospital":
            var response = await axios.get(
              "http://localhost:8080/members/currentHistory",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("병원관리");
            break;
          case "drugstore":
            var response = await axios.get(
              "http://localhost:8080/members/currentHistory",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("약국관리");
            break;
          case "userInquiry":
            var response = await axios.get(
              "http://localhost:8080/members/currentHistory",
              config
            );
            setCurrentHeaders(headers.members);
            setTitle("회원문의");
            break;
          case "doctorInquiry":
            var response = await axios.get(
              "http://localhost:8080/members/currentHistory",
              config
            );
            setCurrentHeaders(headers.members);
            setTitle("의사문의");
            break;
          case "drugstoreInquiry":
            var response = await axios.get(
              "http://localhost:8080/members/currentHistory",
              config
            );
            setItems(response.data);
            setCurrentHeaders(headers.members);
            setTitle("약국문의");
            break;
        }
      } catch (err) {
        console.error("사용자 목록 에러 :", err);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedType, token]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="listWrapper">
      <ListTitle title={title} />
      {(selectedType === "hospital" || selectedType === "drugstore") && (
        <List headers={currentHeaders} items={items} buttonType={""} />
      )}
      {selectedType !== "hospital" && selectedType !== "drugstore" && (
        <List
          headers={currentHeaders}
          items={items}
          buttonType={"N"}
          searchBarStyle={{ position: "absolute", top: "0px", left: "100px" }}
        ></List>
      )}
    </div>
  );
};

export default InquiryManage;
