// 포인트충전
import React from 'react';
import card from '../../../img/card-icon.png';

const ChargePoint = () => {
  return (
    <div className='shortForm'>
      <div id='paymentTitle'>
        <h2>포인트충전</h2>
      </div>
      <div className='paymentBody'>
        <h3>포인트충전</h3>
        <div id='pointDetail'>
          {' '}
          포인트내역 <span>1,000P</span>
        </div>
        <h3 style={{ color: '#000000' }}>충전수단선택</h3>
        <img src={card} alt='card' />
        <h3>신용/체크카드</h3>
        <table id='priceBtnTable'>
          <tr>
            <td>1,000P</td>
            <td>3,000P</td>
            <td>5,000P</td>
          </tr>
          <tr>
            <td>10,000P</td>
            <td>30,000P</td>
            <td>직접입력</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ChargePoint;
