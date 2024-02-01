import React, { useEffect, useState } from "react";
import StatusTable from "../Layout/DashBoard/StatusTable";
import StatusSubTable from "../Layout/DashBoard/StatusSubTable";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/drugstores/getDrugstoreDashBoardData",
          config
        );
        console.log(response);
        setNewOrder(response.data.newOrder);
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    };
    fetchData();
  }, [token, userId]);

  const reviewData = [
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
    { date: "2024.01.11", name: "홍길동", description: "신청이 잘 안됩니다" },
  ];
  return (
    <div className="dashBoardWrapper">
      <div className="dashBoardTop">
        <StatusTable
          firstLabel={"신규주문"}
          firstValue={`${newOrder}건`}
          secondLabel={"주문취소"}
          secondValue={`3건`}
          thirdLabel={"수령완료"}
          thirdValue={`11건`}
          fourthLabel={"총주문건"}
          fourthValue={`25건`}
          fifthLabel={"퀵배송"}
          fifthValue={`3건`}
          sixthLabel={"택배배송"}
          sixthValue={`4건`}
        />
        <StatusSubTable title={"문의관리"} data={reviewData} />
      </div>
      <div className="dashBoardBottom">
        <div className="dashBoardGraph"></div>
      </div>
    </div>
  );
};

export default DrugStoreDashBoard;
