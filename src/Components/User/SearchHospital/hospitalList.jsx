import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import "../../../css/HospitalList.css";
import ReactPaginate from "react-paginate";
import KakaoHospital from "./map";
import Loading from "../ImageSearch/Loading";
import HospitalSearch from "./hospitalSearch";

const HospitalList = () => {
  // 변수 선언
  const [list, setList] = useState([]);
  const { token } = useTokenContext(); // 토큰 컨텍스트에서 토큰 가져오기
  const [pageNumber, setPageNumber] = useState(0);
  const listsPerPage = 5; // 페이지 당 보여줄 아이템 수
  const [loading, setLoading] = useState(false); // 로딩 상태 확인
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleListUpdate = (updatedList) => {
    setList(updatedList);
  };

  // 렌더링될 때 서버에서 데이터 받아서 변수에 지정
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 검색어에 따라 API 호출 URL 구성
        const apiUrl = searchKeyword
          ? `http://localhost:8080/hospitals/getHospitalListByKeyword?keyword=${searchKeyword}`
          : "http://localhost:8080/hospitals/getHospitalList";

        const result = await axios.get(apiUrl, config);

        const newList = result.data;
        setList(newList);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, searchKeyword]);

  const pagesVisited = pageNumber * listsPerPage;
  const displayList = list.slice(pagesVisited, pagesVisited + listsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <h2>병원 검색</h2>
      <div className="hospitalList">
        <div className="listForm">
          <HospitalSearch onSearch={handleSearch} />
          <div className="row">
            {loading && <Loading />}
            <table className="listtable table-striped table-bordered">
              <tbody>
                {!loading && list && list.length > 0 ? (
                  displayList.map((hospital) => (
                    <div className="hospital" key={hospital?.hospitalId}>
                      <ul>
                        <li
                          style={{
                            listStyleType: "none",
                            marginBottom: "10px",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "16px",
                              marginBottom: "2px",
                              fontWeight: "bold",
                            }}
                          >
                            {hospital?.hospitalName || "N/A"}
                          </h2>
                          <p style={{ fontSize: "13px", color: "#666" }}>
                            {hospital?.hospitalAddrMain || "N/A"}
                          </p>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : !loading ? (
                  <tr>
                    <td colSpan="3">데이터가 없습니다.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(list.length / listsPerPage)}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageRangeDisplayed={1} // 현재 페이지 좌우에 2개의 페이지를 보여줍니다.
            marginPagesDisplayed={1} // 현재 페이지 앞뒤로 1개의 마진 페이지를 보여줍니다.
          />
        </div>
        <div className="kakaoMap">
          <KakaoHospital list={list} onListUpdate={handleListUpdate} />
        </div>
      </div>
    </>
  );
};

export default HospitalList;
