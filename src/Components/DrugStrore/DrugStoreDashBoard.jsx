import React, { useEffect, useState } from "react";
import StatusTable from "../Layout/DashBoard/StatusTable";
import StatusSubTable from "../Layout/DashBoard/StatusSubTable";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";
import BarIndexForDS from "./BarIndexForDS";

const DrugStoreDashBoard = () => {
  const { token, userEmail, userId } = useTokenContext();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      drugstoreId: userId,
    },
  };

  const [newOrder, setNewOrder] = useState(0);
  const [receiveWait, setReceiveWait] = useState(0);
  const [received, setReceived] = useState(0);
  const [totalOrderCnt, setTotalOrderCnt] = useState(0);
  const [deliveryCnt, setDeliveryCnt] = useState(0);
  const [pickupCnt, setPickupCnt] = useState(0);

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/drugstores/getDrugstoreDashBoardData",
          config
        );
        console.log(response);
        setNewOrder(response.data.newOrder);
        setReceiveWait(response.data.receiveWait);
        setReceived(response.data.received);
        setTotalOrderCnt(response.data.totalOrderCnt);
        setDeliveryCnt(response.data.deliveryCnt);
        setPickupCnt(response.data.pickupCnt);

        // 리뷰 데이터를 불러오는 API 호출
        const reviewResponse = await axios.get(
          "http://localhost:8080/drugstores/getRecentWaitingList",
          config
        );
        console.log(reviewResponse);
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
          firstLabel={"신규 주문"}
          firstValue={`${newOrder}건`}
          secondLabel={"수령 대기"}
          secondValue={`${receiveWait}건`}
          thirdLabel={"수령 완료"}
          thirdValue={`${received}건`}
          fourthLabel={"총 주문건"}
          fourthValue={`${totalOrderCnt}건`}
          fifthLabel={"택배 배송"}
          fifthValue={`${deliveryCnt}건`}
          sixthLabel={"직접 수령"}
          sixthValue={`${pickupCnt}건`}
        />
        <StatusSubTable title={"수령 대기 고객"} data={reviewData} />
      </div>
      <div className="dashBoardBottom">
        <div className="dashBoardGraph">
          <BarIndexForDS />
        </div>
      </div>
    </div>
  );
};

export default DrugStoreDashBoard;
