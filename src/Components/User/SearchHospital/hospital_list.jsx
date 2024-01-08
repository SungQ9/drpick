import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../TokenContext"; // useToken 훅 추가

const HospitalList = () => {
  // 변수 선언
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { token  } = useToken(); // 토큰 컨텍스트에서 토큰 가져오기
  console.log("useToken > 토큰 : " + token );

  // 렌더링될 때 서버에서 데이터 받아서 변수에 지정
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 헤더에 Authorization 추가
        const config = {
          headers: {
            Authorization: `Bearer ${token }`,
          },
        };

        console.log("header :" + config.headers);

        // API 호출
        const result = await axios.get("http://localhost:8080/hospitals/getHospitalList", config);

        // 데이터 설정
        const newList = result.data;
        console.log(newList);
        setList(newList);
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.status === 401) {
          // 토큰이 만료되었거나 유효하지 않은 경우, 로그인 페이지로 이동 등의 처리 가능
          console.error("Authorization failed. Redirecting to login page.");
          console.error(error.message);
          navigate("/login");
        } else {
          console.error("Error fetching hospital list:", error.message);
        }
      }
    };

    fetchData(); // fetchData 함수 호출
  }, [token, navigate]);
  return (
    <div>
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
            {list.map((hospital) => (
              <tr key={hospital.hospital_id}>
                <td>{hospital.hospital_name}</td>
                <td>{hospital.hospital_addr_main}</td>
                <td>{hospital.partnership_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalList;
