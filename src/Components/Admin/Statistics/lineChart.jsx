import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = async () => {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );

      // 비동기로 데이터를 가져옴
      const dataFromDB = await fetchDataFromDB();

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
          datasets: [
            {
              label: "진료 과목",
              data: [0, 20, 30, 40, 50, 60],
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              pointRadius: 5, // 포인트 크기
              pointBackgroundColor: "rgba(255, 99, 132, 1)", // 포인트 배경색
              pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
              pointHoverRadius: 7, // 호버 시 포인트 크기
              pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // 호버 시 포인트 배경색
              pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
              fill: false, // 라인 그래프에서 영역 채우기 비활성화
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              beginAtZero: true,
              max: 100, // 최대값 설정
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    const initializeChart = () => {
      destroyChart(); // 이전 차트 파괴
      createChart(); // 새로운 차트 생성
    };

    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      destroyChart();
    };
  }, []);

  // 가상의 비동기 함수로 데이터를 가져오는 것으로 가정
  const fetchDataFromDB = async () => {
    // 비동기 작업을 수행하고 데이터를 반환
    // 실제로는 이 부분을 백엔드 API 호출 등으로 대체해야 합니다.
    return [
      { month: "1월", value: 30 },
      { month: "2월", value: 40 },
      { month: "3월", value: 50 },
      // 나머지 데이터들...
    ];
  };

  return <canvas ref={chartRef} />;
};

export default LineChart;
