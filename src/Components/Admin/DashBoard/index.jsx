// 관리자 대시보드
import React from "react";
import StatusTable from "../../Layout/DashBoard/StatusTable";
import StatusSubTable from "../../Layout/DashBoard/StatusSubTable";
import BarIndex from "../Statistics/barIndex";
import DoughnutChartIndex from "../Statistics/doughnutChartIndex";
import "../../../css/GraphStyle.css";
import { useTokenContext } from "../../Context/TokenContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AdminDashBoard = () => {
  const { token } = useTokenContext();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [doctorRequestCount, setDoctorRequestCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 의사 등록 요청 수
        const response_fifthValue = await axios.get(
          "http://localhost:8080/doctors/getDoctorRequestCnt",
          config
        );

        // 신규 이용자 수 - 회원가입 수 or 진료 처음 받은 회원 수 ?
        const response_secondValue = await axios.get(
          "http://localhost:8080/doctors/getDoctorRequestCnt",
          config
        );

        setDoctorRequestCount(response_fifthValue.data);
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };
    fetchData();
  }, []);

  const reviewData = [
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
  ];

  return (
    <>
      <div className="dashBoardWrapper">
        <div className="dashBoardTop">
          <StatusTable
            firstLabel={"당일이용자"}
            firstValue={`350명`}
            secondLabel={"신규이용자"}
            secondValue={`12명`}
            thirdLabel={"접속중인의사수"}
            thirdValue={`25명`}
            fourthLabel={"확인하지않은문의"}
            fourthValue={`12건`}
            fifthLabel={"의사등록요청"}
            fifthValue={`${doctorRequestCount}건`}
            sixthLabel={"당일충전포인트"}
            sixthValue={`1,230,000원`}
          />
          <StatusSubTable title={"문의관리"} data={reviewData} />
        </div>
      </div>
      <div className="dashBoardBottomSection">
        <div className="dashBoardGraphBar">
          <BarIndex />
        </div>
        <div className="dashBoardGraphDoughnut">
          <div className="dou">
            <DoughnutChartIndex />
          </div>
          <div className="dou">
            <DoughnutChartIndex />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
