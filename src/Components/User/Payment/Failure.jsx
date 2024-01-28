import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Failure() {
  const navigate = useNavigate();

  return (
    <div className="billing-failure-container">
      <h1>잘못된 접속 경로</h1>
      <p>잘못된 접속 경로입니다.</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        메인페이지로 이동
      </button>
    </div>
  );
}

export default Failure;
