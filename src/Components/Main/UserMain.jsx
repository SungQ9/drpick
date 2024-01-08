import React from 'react';
import '../../css/UserStyle.css';
import '../../css/Style.css';
import { useNavigate } from 'react-router-dom';

const UserMain = () => {
  const navigate = useNavigate();

  return (
    <div className=''>
      <table className='menu'>
        <tbody>
          <tr>
            <td
              className='pannel'
              onClick={() => {
                navigate('/clinic');
              }}
            >
              비대면 진료 신청하기
            </td>
            <td className='pannel'>광고</td>
          </tr>
          <tr>
            <td
              className='pannel'
              onClick={() => {
                navigate('/imageSearch');
              }}
            >
              약 이미지 검색
            </td>
            <td
              className='pannel'
              onClick={() => {
                navigate('/imageSearch');
              }}
            >
              챗 봇 검색
            </td>
          </tr>
          <tr>
            <td
              className='pannel'
              onClick={() => {
                navigate('/searchHospital');
              }}
            >
              병원 찾기
            </td>
            <td
              className='pannel'
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
