import React from 'react';
import { useNavigate } from 'react-router-dom';

const Panel = ({ label, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <td id='panel' onClick={handleClick}>
      {label}
    </td>
  );
};

const UserMain = () => {
  return (
    <div id='UserMain'>
      <table id='menu'>
        <tbody>
          <tr>
            <Panel label='비대면 진료 신청하기' to='/clinic' />
            <Panel label='광고' />
          </tr>
          <tr>
            <Panel label='약 이미지 검색' to='/imageSearch' />
            <Panel label='챗 봇 검색' to='/imageSearch' />
          </tr>
          <tr>
            <Panel label='병원 찾기' to='/searchHospital' />
            <Panel label='약국 찾기' to='/searchDrugStore' />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserMain;
