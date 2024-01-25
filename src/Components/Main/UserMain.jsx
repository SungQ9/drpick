import React from 'react';
import { useNavigate } from 'react-router-dom';
import doctor from '../../img/panel-doctor.png';
import pill from '../../img/panel-pill.png';
import hospital from '../../img/panel-hospital.png';
import drugstore from '../../img/panel-drugstore.png';
import chat from '../../img/panel-chat.png';
import Carousel from '../Layout/Carousel';

const Panel = ({ label, to, img, button }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  const style = img
    ? {
        backgroundImage: `url(${img})`,
        backgroundSize: '50%',
        backgroundPosition: '302px -86px',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  // button이 있을 경우 버튼을 렌더링
  const renderButton = () => {
    if (button) {
      return (
        <button
          onClick={handleClick}
          style={{
            background: '#00cec8',
          }}
        >
          {button.label}
        </button>
      );
    }

    return null;
  };

  return (
    <td id='panel' style={style} onClick={!button ? handleClick : undefined}>
      <h4>{label}</h4>
      {renderButton()}
    </td>
  );
};

const UserMain = () => {
  return (
    <div id='UserMain'>
      <table id='menu'>
        <tbody>
          <tr>
            <Panel
              label='비대면 진료 신청하기'
              to='/clinic'
              img={doctor}
              button={{ label: '신청하기' }}
            />

            <Carousel />
          </tr>
          <tr>
            <Panel label='약 이미지 검색' to='/imageSearch' img={pill} />
            <Panel label='챗 봇 검색' to='/chatBot' img={chat} />
          </tr>
          <tr>
            <Panel label='병원 찾기' to='/searchHospital' img={hospital} />
            <Panel label='약국 찾기' to='/searchDrugStore' img={drugstore} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserMain;
