import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext"; // useToken 훅 추가
import Kakao from "./map";
import "../../../css/HospitalList.css";
import ReactPaginate from "react-paginate";

const HospitalList = () => {
  // 변수 선언
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { token } = useTokenContext(); // 토큰 컨텍스트에서 토큰 가져오기
  const [pageNumber, setPageNumber] = useState(0);
  const listsPerPage = 5; // 페이지 당 보여줄 아이템 수

  // 렌더링될 때 서버에서 데이터 받아서 변수에 지정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 헤더에 Authorization 추가
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // API 호출
        const result = await axios.get(
          "http://localhost:8080/hospitals/getHospitalList",
          config
        );

        // 데이터 설정
        const newList = result.data;
        console.log(newList);
        setList(newList);
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.status === 401) {
          // 토큰이 만료되었거나 유효하지 않은 경우, 로그인 페이지로 이동 등의 처리 가능
          navigate("/login");
        }
      }
    };

    fetchData(); // fetchData 함수 호출
  }, [token, navigate]);

  const pagesVisited = pageNumber * listsPerPage;
  const displayList = list.slice(pagesVisited, pagesVisited + listsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="hospitalList">
      <div className="listForm">
        <h2 className="text-center">병원 리스트</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>병원명</th>
                <th>주소</th>
                <th>제휴상태 </th>
              </tr>
            </thead>
            <tbody>
              {list && list.length > 0 ? (
                displayList.map((hospital) => (
                  <tr key={hospital?.hospitalId}>
                    <td>{hospital?.hospitalName || "N/A"}</td>
                    <td>{hospital?.hospitalAddrMain || "N/A"}</td>
                    <td>{hospital?.partnershipStatus || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

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
      </div>
      <div className="kakaoMap">
        <Kakao list={list} />
      </div>
    </div>
  );
};

export default HospitalList;
