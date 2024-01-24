import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";
import headers from "../SampleData/Headers";
import ListTitle from "../Layout/List/ListTitle";
import List from "../Layout/List";
import Pagination from "../Layout/List/Pagination";

const DoctorManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || "default";
  const { token, userAuth } = useTokenContext();
  const [title, setTitle] = useState("");
  const [currentHeaders, setCurrentHeaders] = useState();
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      doctorId: localStorage.getItem("userId"),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedType === "history") {
          const response = await axios.get(
            "http://localhost:8080/doctors/getDoctorCurrentHistory",
            config
          );
          console.log("Response from server:", response.data); // 콘솔에 출력
          setItems(response.data);
          setCurrentHeaders(headers.doctorhistory);
          setTitle("진료기록조회");
        } else if (selectedType === "inquiry") {
          const response = await axios.get(
            "http://localhost:8080/doctors/getDoctorInquiry",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                doctorId: localStorage.getItem("userId"),
              },
            }
          );
          console.log("의사문의 ");
          setItems(response.data);
          setCurrentHeaders(headers.inquiry);
          setTitle("문의내역");
        }
      } catch (err) {
        console.error("의사 목록 에러 :", err);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedType, token]);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="listWrapper">
      <ListTitle title={title} />
      {selectedType === "history" && (
        <List
          headers={currentHeaders}
          items={items}
          type="Date"
          buttonType={""}
        />
      )}
      {selectedType === "inquiry" && (
        <List
          headers={currentHeaders}
          items={items}
          type="Date"
          buttonType="Y"
          buttonName="작성"
        />
      )}
    </div>
  );
};

export default DoctorManagement;
