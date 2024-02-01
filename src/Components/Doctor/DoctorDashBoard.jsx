import React, { useEffect, useState } from "react";
import StatusTable from "../Layout/DashBoard/StatusTable";
import StatusSubTable from "../Layout/DashBoard/StatusSubTable";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";
import SubjectChartIndex from "./subjectChartIndex";

const DoctorDashBoard = () => {
  const { token, userId } = useTokenContext();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      doctorId: userId,
    },
  };
  const [reservationCntForDoctor, setReservationCntForDoctor] = useState(0);
  const [reservationWaitCntForDoctor, setReservationWaitCntForDoctor] =
    useState(0);
  const [unpaidPaymentSum, setUnpaidPaymentSum] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [reviewAvg, setReviewAvg] = useState(0);

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 의사 대시보드 데이터를 불러오는 API 호출
        const response = await axios.get(
          "http://localhost:8080/doctors/getDoctorDashBoardData",
          config
        );
        console.log(response);
        setReservationCntForDoctor(response.data.reservationCntForDoctor);
        setReservationWaitCntForDoctor(
          response.data.reservationWaitCntForDoctor
        );
        setUnpaidPaymentSum(response.data.unpaidPaymentSum);
        setTotalSales(response.data.totalSales);
        setReviewCnt(response.data.reviewCnt);
        setReviewAvg(response.data.reviewAvg);

        // 리뷰 데이터를 불러오는 API 호출
        const reviewResponse = await axios.get(
          "http://localhost:8080/doctors/getRecentReviewsList",
          config
        );
        console.log(reviewResponse.data[0].reviewTitle);
        console.log(reviewResponse.data[0].comments);
        console.log(reviewResponse.data[0].rating);

        setReviewData(reviewResponse.data);
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };
    fetchData();
  }, [token, userId]);

  return (
    <div className="dashBoardWrapper">
      <div className="dashBoardTop">
        <StatusTable
          firstLabel={"예약 접수"}
          firstValue={`${reservationCntForDoctor}건`}
          secondLabel={"접수 대기"}
          secondValue={`${reservationWaitCntForDoctor}건`}
          thirdLabel={"미결제건"}
          thirdValue={`${unpaidPaymentSum}원`}
          fourthLabel={"총 매출액"}
          fourthValue={`${totalSales}원`}
          fifthLabel={"리뷰 건수"}
          fifthValue={`${reviewCnt}건`}
          sixthLabel={"리뷰 평점"}
          sixthValue={`${reviewAvg}점`}
        />
        <StatusSubTable title={"최근 작성된 리뷰"} data={reviewData} />
      </div>
      <div className="dashBoardBottom">
        <div className="dashBoardGraph">
          <SubjectChartIndex />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashBoard;
