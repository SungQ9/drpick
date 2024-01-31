// 마이페이지 메인
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import axios from "axios";
import card from "../../../img/card-icon.png";
import headers from "../../SampleData/Headers";
import CurrentList from "../../Layout/List/CurrentList";
import Loading from "../ImageSearch/Loading";

const MypageMain = () => {
  const navigate = useNavigate();
  const { token, userAuth } = useTokenContext();
  const [items, setItems] = useState();
  const [currentHeaders, setCurrentHeaders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [memberPoint, setMemberPoint] = useState("");

  // 버튼 클릭시 지정해둔 입력값에 따라서 해당 목록 전달
  const handleButtonClick = (type) => {
    navigate("/user/manager", { state: { selectedType: type } });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberId: localStorage.getItem("userId"),
      memberEmail: localStorage.getItem("userEmail"),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 최근진료내역
        const response = await axios.get(
          "http://localhost:8080/members/currentHistory",
          config
        );
        setItems(response.data);
        setCurrentHeaders(headers.medeicalhistoryMypage);

        // 포인트 조회
        const pointCheck = await axios.get(
          "http://localhost:8080/members/getMemberInfo",
          config
        );

        const formattedPoint = new Intl.NumberFormat("ko-KR", {
          style: "decimal",
        }).format(pointCheck.data.memberPoint);
        setMemberPoint(formattedPoint);
      } catch (err) {
        console.error("마이페이지 에러 :", err);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // const state = navigate().state;
    // if (state && state.selectedType) {
    // } else {
    //   setIsLoading(false);
    // }
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="userPageWrapper">
      <div className="userPageTitle">
        <h2>마이페이지</h2>
      </div>
      <div className="menuContainer">
        <table className="menuTable">
          <tr>
            <td
              onClick={() => {
                handleButtonClick("history");
              }}
            >
              <img src={card} alt="" />
              <p>진료내역조회</p>
            </td>
            <td
              onClick={() => {
                handleButtonClick("inquiry");
              }}
            >
              {" "}
              <img src={card} alt="" />
              <p>1:1 문의</p>
            </td>
            <td
              onClick={() => {
                navigate("/user/profileEdit");
              }}
            >
              {" "}
              <img src={card} alt="" />
              <p>회원정보수정</p>
            </td>
            <td
              onClick={() => {
                navigate("/user/payment");
              }}
            >
              {" "}
              <img src={card} alt="" />
              <p>결제수단관리</p>
            </td>
            <td
              onClick={() => {
                handleButtonClick("review");
              }}
            >
              {" "}
              <img src={card} alt="" />
              <p>리뷰관리</p>
            </td>
          </tr>

          <td
            className="pointDetail"
            id="pointDetail"
            onClick={() => {
              navigate("/user/modal");
            }}
          >
            {" "}
            포인트내역 <span>{memberPoint} P</span>
          </td>
        </table>
      </div>
      <h4>최근진료내역</h4>
      <CurrentList
        headers={currentHeaders}
        items={items}
        style={{ height: "450px", width: "950px" }}
        type={"Lite"}
      />
    </div>
  );
};

export default MypageMain;
