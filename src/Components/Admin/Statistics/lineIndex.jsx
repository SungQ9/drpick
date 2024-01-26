import { useEffect, useState } from "react";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";
import LineChart from "./lineChart";
import "../../../css/GraphStyle.css";

const LineIndex = () => {
  const [chartData, setChartData] = useState([]);
  const { token } = useTokenContext();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // 데이터를 서버에서 가져온다고 가정
    axios
      .get("http://localhost:8080/admin/getMonthlySales", config)
      .then((response) => {
        setChartData(response.data);
        console.log(response.data); // 값 출력
      });
  }, []);
  return (
    <div id="lineGraph">
      <h2>월 매출</h2>
      <div className="graphForm2">
        <LineChart data={chartData} />
        {/* <MyChart /> */}
      </div>
    </div>
  );
};

export default LineIndex;
