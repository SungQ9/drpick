// 마이페이지 메인
import React from 'react';
import { useNavigate } from 'react-router-dom';
import card from '../../../img/card-icon.png';
import data from './sampledata/medicalhistoryData';
import CurrentList from '../../Layout/List/list';

const MypageMain = () => {
  const navigate = useNavigate();

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
                navigate('/user/history');
              }}
            >
              <img src={card} alt='' />
              <p>진료내역조회</p>
            </td>
            <td
              onClick={() => {
                navigate('/user/inquiry');
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
                navigate('/user/review');
              }}
            >
              {' '}
              <img src={card} alt='' />
              <p>리뷰관리</p>
            </td>
          </tr>

          <td className='pointDetail' id='pointDetail'>
            {' '}
            포인트내역 <span>1,000P</span>
          </td>
        </table>
      </div>
      <h4>최근진료내역</h4>
      <CurrentList
        headers={headers}
        items={items}
        style={{ height: '300px', width: '950px' }}
      />
    </div>
  );
};

export default MypageMain;
