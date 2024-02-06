import React from 'react';

import back from '../../../../img/back-arrow-icon.png';
import { useNavigate } from 'react-router-dom';
import delivery from '../../../../img/delivery-icon.png';
import box from '../../../../img/box-icon.png';
import pickup from '../../../../img/pill-market-icon.png';

const Delivery = ({ onSelectPrice, certificateNum }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
      </div>
      <div className='delivery-main'>
        <div className='delivery-text'>
          <h2 style={{ fontSize: '25px', marginBottom: '0px' }}>
            약수령방법을 선택하면
          </h2>
          <h2 style={{ fontSize: '25px', marginTop: '0px' }}>
            {' '}
            안전하게 배달해드립니다
          </h2>
          <h2>주소등록 · 확인</h2>
        </div>
        <div className='delivery-list'>
          <ul>
            <li>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectPrice(5000)}
              >
                <img src={delivery} alt='delivery' />
                <div className='delivery-list-text'>
                  <h2> 오늘배송</h2>
                  <span style={{ color: '#6B6B6B' }}>오늘받아보기</span>
                </div>
              </div>
              <div>
                <p>5,000원</p>
              </div>
            </li>
            <li>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectPrice(2500)}
              >
                <img src={box} alt='delivery' />
                <div className='delivery-list-text'>
                  <h2>택배</h2>
                  <span style={{ color: '#6B6B6B' }}>
                    전국 어디서든 수령 가능
                  </span>
                  <span style={{ color: '#11C2AD' }}>(평균 2~3일 소요)</span>
                </div>
              </div>
              <div>
                <p>2,500원</p>
              </div>
            </li>
            <li>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectPrice(0)}
              >
                <img src={pickup} alt='delivery' />
                <div className='delivery-list-text'>
                  <h2>방문수령</h2>
                  <span style={{ color: '#6B6B6B' }}>약국에서 직접 받기</span>
                </div>
              </div>
              <div>
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
