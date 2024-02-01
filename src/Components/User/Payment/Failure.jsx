import React from "react";
import { useNavigate } from "react-router-dom";

function Failure() {
  const navigate = useNavigate();

  return (
    // 오류 메시지 컨테이너
    <div className="billing-failure-container">
      {/* 오류 제목 */}
      <h1>잘못된 접속 경로</h1>
      {/* 오류 설명 메시지 */} 
      <p>잘못된 접속 경로입니다.</p> 
      <button
        onClick={() => {
          // 사이트 메인페이지로 이동하는 버튼
          navigate("/");
        }}
      >
        메인페이지로 이동
      </button>
    </div>
  );
}

export default Failure;
