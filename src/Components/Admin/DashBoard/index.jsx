// 관리자 대시보드
import React from "react";
import StatusTable from "../../Layout/DashBoard/StatusTable";
import StatusSubTable from "../../Layout/DashBoard/StatusSubTable";
import BarIndex from "../Statistics/barIndex";
import DoughnutChartIndex from "../Statistics/doughnutChartIndex";
import "../../../css/GraphStyle.css";

const AdminDashBoard = () => {
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
            fifthValue={`2건`}
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
