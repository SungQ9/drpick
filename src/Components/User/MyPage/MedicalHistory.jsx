import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDate from '../../Layout/SearchDate';
import Pagination from '../../Layout/Pagination';
import back from '../../../img/back-arrow-icon.png';

const MedicalHistory = () => {
  const navigate = useNavigate();

  // startDate와 endDate를 상태로 관리
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // 페이지 상태 및 함수 정의
  const [Page, setPage] = React.useState(1);
  const itemsPerPage = 7; // 한 페이지에 보여질 아이템 수

  const medicalHistoryData = [
    // ... (진료내역 데이터)
  ];

  const indexOfLastItem = Page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicalHistoryData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setPage(pageNumber);
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
        <h2>진료내역조회</h2>
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
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
};

export default MedicalHistory;
