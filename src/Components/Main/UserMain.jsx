import React from 'react';
import '../../css/Style.css';
import { useNavigate } from 'react-router-dom';

const UserMain = () => {
  const navigate = useNavigate();

  return (
    <div id='UserMain'>
      <table id='menu'>
        <tbody>
          <tr>
            <td
              id='pannel'
              onClick={() => {
                navigate('/clinic');
              }}
            >
              비대면 진료 신청하기
            </td>
            <td id='pannel'>광고</td>
          </tr>
          <tr>
            <td
              id='pannel'
              onClick={() => {
                navigate('/imageSearch');
              }}
            >
              약 이미지 검색
            </td>
            <td
              id='pannel'
              onClick={() => {
                navigate('/imageSearch');
              }}
            >
              챗 봇 검색
            </td>
          </tr>
          <tr>
            <td
              id='pannel'
              onClick={() => {
                navigate('/searchHospital');
              }}
            >
              병원 찾기
            </td>
            <td
              id='pannel'
              onClick={() => {
                navigate('/searchDrugStore');
              }}
            >
              약국 찾기
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserMain;
