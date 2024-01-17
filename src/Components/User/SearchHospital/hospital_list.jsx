import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext"; // useToken 훅 추가

const HospitalList = () => {
  // 변수 선언
  const [list, setList] = useState([]);
  const { token } = useTokenContext(); // 토큰 컨텍스트에서 토큰 가져오기
  console.log("useToken > 토큰 : " + token);

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
