import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/Style.css';
import '../../../css/UserStyle.css';

import card from '../../../img/card-icon.png';

const MypageMain = () => {
  const navigate = useNavigate();

  return (
    <div className='mypageContainer'>
      <div className='mypageWrapper'>
        <div className='mypageTitle'>
          <h2>마이페이지</h2>
        </div>
        <div className='menuContainer'>
          <table className='menuTable'>
            <tr>
              <td
                onClick={() => {
                  navigate('');
                }}
              >
                <img src={card} alt='' />
                <p>진료내역조회</p>
              </td>
              <td
                onClick={() => {
                  navigate('');
                }}
              >
                {' '}
                <img src={card} alt='' />
                <p>1:1 문의</p>
              </td>
              <td
                onClick={() => {
                  navigate('');
                }}
              >
                {' '}
                <img src={card} alt='' />
                <p>회원정보수정</p>
              </td>
              <td
                onClick={() => {
                  navigate('');
                }}
              >
                {' '}
                <img src={card} alt='' />
                <p>결제수단관리</p>
              </td>
              <td
                onClick={() => {
                  navigate('');
                }}
              >
                {' '}
                <img src={card} alt='' />
                <p>리뷰관리</p>
              </td>
            </tr>

            <div className='pointDetail'>
              {' '}
              포인트내역 <span>1,000P</span>
            </div>
          </table>
        </div>
        <div id='clinicList'>
          <h4>최근진료내역</h4>
          <table className='clinicListTable'>
            <thead>
              <tr>
                <th>진료일</th>
                <th>병원명</th>
                <th>의사명</th>
                <th>결제수단</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024.01.27</td>
                <td>거구장병원</td>
                <td>정하림 의사</td>
                <td>카드결제</td>
              </tr>
              <tr>
                <td>2024.01.27</td>
                <td>거구장병원</td>
                <td>백두산 의사</td>
                <td>포인트결제</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MypageMain;
