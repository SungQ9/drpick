// 1:1문의
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDate from '../../Layout/SearchDate';
import back from '../../../img/back-arrow-icon.png';

const Inquiry = () => {
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
        <h2>1:1문의</h2>
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
        <table className='listTable'>
          <thead>
            <tr>
              <th>문의유형</th>
              <th>제목</th>
              <th>문의작성일</th>
              <th>이름</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>이용문의</td>
              <td>신청이안됨</td>
              <td>2024-01-10</td>
              <td>추하림</td>
              <td>
                <button
                  className='clinicSubBtn-mid'
                  style={{ background: '#11c2ad' }}
                >
                  답변대기
                </button>
              </td>
            </tr>
            <tr>
              <td>회원문의</td>
              <td>ㅈㄴ안됨</td>
              <td>2024-01-5</td>
              <td>무하림</td>
              <td>
                <button className='clinicSubBtn-mid'>답변완료</button>
              </td>
            </tr>
            <tr>
              <td>회원문의</td>
              <td>개안됨</td>
              <td>2024-01-02</td>
              <td>무하림</td>
              <td>
                <button className='clinicSubBtn-mid'>답변완료</button>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
          <button
            id='writeBtn'
            className='clinicSubBtn-mid'
            style={{ background: '#11c2ad' }}
          >
            작성하기
          </button>
        </table>
      </div>
    </div>
  );
};

export default Inquiry;
