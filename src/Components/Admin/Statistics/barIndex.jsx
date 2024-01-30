import { useEffect, useState } from "react";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";
import BarChart from "./barChart";

const BarIndex = () => {
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
      .get("http://localhost:8080/hospitals/getHospitalRegionCnt", config)
      .then((response) => {
        setChartData(response.data);
      });
  }, []);
  return (
    <div>
      <h2>지역별 병원 분포</h2>
      <div className="graphForm1">
        <BarChart data={chartData} />
        {/* <MyChart /> */}
      </div>
    </div>
  );
};

export default BarIndex;
