import React, { useEffect, useState } from "react";
import BarIndex from "./barIndex";
import "../../../css/GraphStyle.css";
import DoughnutChartIndex from "./doughnutChartIndex";

const Statistics = () => {
  return (
    <div className="entireGraphForm">
      <h2>통계 </h2>
      <div>
        <div className="grid-container">
          <BarIndex />
          <DoughnutChartIndex />

          {/* <MyChart /> */}
        </div>
        <div className="grid-container"></div>
      </div>
    </div>
  );
};

export default Statistics;
