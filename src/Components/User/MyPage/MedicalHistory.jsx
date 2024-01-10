// 진료내역조회
import React from 'react';

const MedicalHistory = () => {
  return (
    <div className='userPageWrapper'>
      <div className='userPageTitle'>
        <h2>진료내역조회</h2>
      </div>
      <div className='searchDateWrapper'>
        <div className='searchDateText'>
          <h2>
            기간선택 <span>최근 1년 전까지 조회 가능</span>
          </h2>
        </div>
        <div className='searchDateForm'>
          <input type='text' /> ~ <input type='text' />
          <button className='clinicSubBtn-mid'>당일</button>
          <button className='clinicSubBtn-mid'>최근1개월</button>
          <input type='text' />
          <button className='clinicSubBtn-short'>검색</button>
        </div>
      </div>
      <div className='listForm'>
        <table className='listTable'>
          <thead>
            <tr>
              <th>진료일</th>
              <th>병원명</th>
              <th>의사명</th>
              <th>결제수단</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024.01.27</td>
              <td>거구장병원</td>
              <td>정하림 의사</td>
              <td>카드결제</td>
              <td>
                <button className='listBtn-short'>진단서</button>
                <button
                  className='listBtn-short'
                  style={{ background: '#AECCC8' }}
                >
                  처방전
                </button>
              </td>
            </tr>
            <tr>
              <td>2024.01.27</td>
              <td>거구장병원</td>
              <td>백두산 의사</td>
              <td>포인트결제</td>
              <td>
                <button className='listBtn-mid'>진료실입장하기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalHistory;
