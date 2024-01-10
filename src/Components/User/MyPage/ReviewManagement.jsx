// 리뷰관리
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDate from '../../Layout/SearchDate';
import back from '../../../img/back-arrow-icon.png';

const ReviewManagement = () => {
  const navigate = useNavigate();

  // startDate와 endDate를 상태로 관리
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  return (
    <div className='listWrapper'>
      <div className='listTitle'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h2>리뷰관리</h2>
      </div>
      <div className='searchDateWrapper'>
        {/* 
          SearchDate 컴포넌트에 startDate, endDate, 
          onStartDateChange, onEndDateChange, onSearch를 전달 
        */}
        <SearchDate
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>
      <div className='listForm'>
        <table className='checklistTable'>
          <thead>
            <tr>
              <th></th>
              <th>진료일</th>
              <th>병원명</th>
              <th>의사명</th>
              <th>내평점</th>
              <th>리뷰상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' />
              </td>
              <td>2024-01-10</td>
              <td>거구장병원</td>
              <td>백두산의사</td>
              <td>5.0</td>
              <td>
                <button
                  className='listBtn-short'
                  style={{ background: '#11c2ad' }}
                >
                  작성전
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input type='checkbox' />
              </td>
              <td>2024-01-10</td>
              <td>거구장병원</td>
              <td>백두산의사</td>
              <td>5.0</td>
              <td>
                <button
                  className='listBtn-short'
                  style={{ background: '#11c2ad' }}
                >
                  작성전
                </button>
              </td>
            </tr>
          </tbody>

          <button
            id='deleteBtn'
            className='clinicSubBtn-mid'
            style={{ background: '#11c2ad' }}
          >
            리뷰삭제
          </button>
        </table>
      </div>
    </div>
  );
};

export default ReviewManagement;
