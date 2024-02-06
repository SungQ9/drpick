import axios from "axios";
import { useEffect, useState } from "react";
import { useTokenContext } from "../Context/TokenContext";
import BarChartForDS from "./BarChartForDS";

const BarIndexForDS = () => {
  const [chartData, setChartData] = useState([]);
  const { token, userId } = useTokenContext();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        drugstoreId: userId,
      },
    };
    // 데이터를 서버에서 가져온다고 가정
    axios
      .get(
        "http://localhost:8080/drugstores/getDrugstoreReceiveMethodList",
        config
      )
      .then((response) => {
        setChartData(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <div>
      <h2>약 수령 방법</h2>
      <div className="graphForm3">
        <BarChartForDS data={chartData} />
      </div>
    </div>
  );
};

export default BarIndexForDS;
