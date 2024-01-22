import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const regionColors = [
      "rgba(75, 192, 192, 0.2)",
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(153, 102, 255, 0.2)",
    ];

    const createChart = () => {
      Chart.register(...registerables);

      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.map((item) => item.ageGroup),
          datasets: [
            {
              label: "나이대별 사용자",
              data: data.map((item) => item.memberCnt),
              backgroundColor: regionColors, // 각 지역에 대한 색상 배열
              borderColor: regionColors.map((color) =>
                color.replace("0.2", "1")
              ), // 테두리 색상 배열
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    createChart(); // 차트 생성

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };
  }, [data]); // data가 변경될 때마다 useEffect 실행

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
