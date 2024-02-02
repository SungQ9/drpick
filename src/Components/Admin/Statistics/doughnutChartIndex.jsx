import { useEffect, useState } from 'react';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import DoughnutChart from './doughnutChart';

const DoughnutChartIndex = () => {
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
      .get('http://localhost:8080/members/getMembersCntByAge', config)
      .then((response) => {
        setChartData(response.data);
      });
  }, []);
  return (
    <div>
      <h2>나이대 별 사용자</h2>
      <div className='graphForm2'>
        <DoughnutChart data={chartData} />
        {/* <MyChart /> */}
      </div>
    </div>
  );
};

export default DoughnutChartIndex;
