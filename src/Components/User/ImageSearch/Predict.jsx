import React, { useState } from "react";

// DrugsPredict 컴포넌트

const DrugsPredict = ({ predictionResult }) => {
  return (
    <div>
      <div id="drugsPredict">
        {predictionResult ? (
          <div className="predictForm">
            <img
              src={`http://114.207.167.66:5000${predictionResult.image_url}`}
              alt="알약 이미지"
            />
            <h3>이 약의 색은 "{predictionResult.pill_color}"이며, </h3>
            <h3>
              "{predictionResult.pill_text}"이라는 각인이 새겨져 있습니다.
            </h3>
            {predictionResult.confidence && (
              <p>정확도: 약 {Math.round(predictionResult.confidence * 100)}%</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DrugsPredict;
