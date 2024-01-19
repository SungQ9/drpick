// 마이페이지 메인
import React from 'react';
import { useNavigate } from 'react-router-dom';
import card from '../../../img/card-icon.png';
import data from '../../SampleData/medicalhistoryData';
import CurrentList from '../../Layout/List/CurrentList';

const MypageMain = () => {
  const navigate = useNavigate();

  // 버튼 클릭시 지정해둔 입력값에 따라서 해당 목록 전달
  const handleButtonClick = (type) => {
    navigate('/user/manager', { state: { selectedType: type } });
  };

  // 테스트 데이터 처리하는 코드
  const headers = data.headers.filter((header) => header.value !== 'status');
  const items = data.items.filter((items) => items.value !== 'status');

  return (
    <div className='userPageWrapper'>
      <div className='userPageTitle'>
        <h2>마이페이지</h2>
      </div>
      <div className='menuContainer'>
        <table className='menuTable'>
          <tr>
            <td
              onClick={() => {
                handleButtonClick('history');
              }}
            >
              <img src={card} alt='' />
              <p>진료내역조회</p>
            </td>
            <td
              onClick={() => {
                handleButtonClick('inquiry');
              }}
            >
              {' '}
              <img src={card} alt='' />
              <p>1:1 문의</p>
            </td>
            <td
              onClick={() => {
                navigate('/user/profileEdit');
              }}
            >
              {' '}
              <img src={card} alt='' />
              <p>회원정보수정</p>
            </td>
            <td
              onClick={() => {
                navigate('/user/payment');
              }}
            >
              {' '}
              <img src={card} alt='' />
              <p>결제수단관리</p>
            </td>
            <td
              onClick={() => {
                handleButtonClick('review');
              }}
            >
              {' '}
              <img src={card} alt='' />
              <p>리뷰관리</p>
            </td>
          </tr>

          <td
            className='pointDetail'
            id='pointDetail'
            onClick={() => {
              navigate('/user/modal');
            }}
          >
            {' '}
            포인트내역 <span>1,000P</span>
          </td>
        </table>
      </div>
      <h4>최근진료내역</h4>
      <CurrentList
        headers={headers}
        items={items}
        style={{ height: '450px', width: '950px' }}
        type={'Lite'}
      />
    </div>
  );
};

export default MypageMain;
