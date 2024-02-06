// 관리자 대시보드
import React from 'react';
import StatusTable from '../../Layout/DashBoard/StatusTable';
import StatusSubTable from '../../Layout/DashBoard/StatusSubTable';
import BarIndex from '../Statistics/barIndex';
import DoughnutChartIndex from '../Statistics/doughnutChartIndex';
import '../../../css/GraphStyle.css';
import { useTokenContext } from '../../Context/TokenContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import LineIndex from '../Statistics/lineIndex';
import SubjectChartIndex from '../../Doctor/subjectChartIndex';

const AdminDashBoard = () => {
  const { token } = useTokenContext();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [doctorRequestCount, setDoctorRequestCount] = useState(0);
  const [reservationCnt, setReservationCnt] = useState(0);
  const [certificateCnt, setCertificateCnt] = useState(0);
  const [newUserCnt, setNewUserCnt] = useState(0);
  const [newUserCntByYear, setNewUserCntByYear] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/admin/getDashBoardData',
          config,
        );
        console.log(response);
        setDoctorRequestCount(response.data.requestCnt);
        setReservationCnt(response.data.reservationCnt);
        setCertificateCnt(response.data.certificateCnt);
        setNewUserCnt(response.data.newUserCnt);
        setNewUserCntByYear(response.data.newUserCntByYear);
        setTotalSales(response.data.totalSales);
      } catch (error) {
        console.error('API 호출 에러:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='dashBoardWrapper'>
        <div className='dashBoardTop'>
          <StatusTable
            firstLabel={'당일 총 예약'}
            firstValue={`${reservationCnt}건`}
            secondLabel={'당일 총 진료'}
            secondValue={`${certificateCnt}건`}
            thirdLabel={'당일 신규 회원'}
            thirdValue={`${newUserCnt}명`}
            fourthLabel={'올해 신규 회원'}
            fourthValue={`${newUserCntByYear}건`}
            fifthLabel={'의사 등록 요청'}
            fifthValue={`${doctorRequestCount}건`}
            sixthLabel={'월 총 매출'}
            // sixthValue={`${totalSales.toLocaleString()}원`}
          />
          <LineIndex />
        </div>
      </div>
      <div className='dashBoardBottomSection'>
        <div className='dashBoardGraphBar'>
          <BarIndex />
        </div>
        <div className='dashBoardGraphDoughnut'>
          <div className='dou'>
            <DoughnutChartIndex />
          </div>
          <div className='dou'>
            <SubjectChartIndex />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
