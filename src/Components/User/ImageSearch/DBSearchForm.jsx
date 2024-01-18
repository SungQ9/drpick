import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const DBSearch = ({ predictionResult }) => {
  const [drugs, setDrugs] = useState([]);
  const [pillColor, setPillColor] = useState(""); // 알약 색상
  const [pillText, setPillText] = useState(""); // 알약 각인
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const drugsPerPage = 5; // 페이지 당 보여줄 아이템 수

  const searchUrl = "http://localhost:8080/api/drugsSearch";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (predictionResult) {
      const { pill_color, pill_text } = predictionResult;
      setPillColor(pill_color);
      setPillText(pill_text);

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
        .then((response) => {
          setDrugs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [predictionResult, token]);

  const pagesVisited = pageNumber * drugsPerPage;
  const displayDrugs = drugs.slice(pagesVisited, pagesVisited + drugsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="tableWrapper">
      <h2>DB 목록</h2>
      {predictionResult ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>약 이름</th>
                <th>약 모양</th>
                <th>제약 회사</th>
                <th>약 효능</th>
              </tr>
            </thead>
            <tbody>
              {displayDrugs.map((drug) => (
                <tr key={drug.id}>
                  <td>{drug.drugName}</td>
                  <td>{drug.drugShape}</td>
                  <td>{drug.drugCompany}</td>
                  <td>{drug.drugEfficacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            pageCount={Math.ceil(drugs.length / drugsPerPage)}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      ) : (
        <p>약 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default DBSearch;
