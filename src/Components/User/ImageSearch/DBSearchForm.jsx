import React, { useEffect, useState } from "react";
import axios from "axios";

const DBSearch = ({ predictionResult }) => {
  const [drugs, setDrugs] = useState([]);
  const [pillColor, setPillColor] = useState(""); // 알약 색상
  const [pillText, setPillText] = useState(""); // 알약 각인
  const [loading, setLoading] = useState(false);

  const searchUrl = "http://localhost:8080/api/drugsSearch";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (predictionResult) {
      // predictionResult에서 색상과 텍스트 가져오기
      const { pill_color, pill_text } = predictionResult;

      // 알약 색상과 텍스트 설정
      setPillColor(pill_color);
      setPillText(pill_text);

      // 서버로 요청 보내기
      axios
        .get(searchUrl, {
          params: {
            drugColor: pill_color,
            drugText: pill_text,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => setDrugs(response.data))
        .catch((error) => console.error(error));
    }
  }, [predictionResult, token]);

  return (
    <div>
      <h2>DB 목록 불러오기 부분입니다.</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {drugs.map((drug) => (
            <li key={drug.id}>
              <p>Drug Name: {drug.drugName}</p>
              <p>Drug Company: {drug.drugCompany}</p>
              {/* 기타 필요한 정보들을 추가로 표시 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DBSearch;
