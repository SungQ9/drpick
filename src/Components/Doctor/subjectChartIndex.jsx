import { useEffect, useState } from "react";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";
import SubjectChart from "./subjectChart";

const SubjectChartIndex = () => {
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
      .get("http://localhost:8080/doctors/getDoctorSubjectCntList", config)
      .then((response) => {
        setChartData(response.data);
      });
  }, []);
  return (
    <div>
      <h2>의사 진료과목 분포</h2>
      <div className="graphForm3">
        <SubjectChart data={chartData} />
        {/* <MyChart /> */}
      </div>
    </div>
  );
};

export default SubjectChartIndex;
