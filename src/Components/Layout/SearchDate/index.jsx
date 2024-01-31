import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import SearchBar from '../SearchBar';

const SearchDate = ({ type, onSearch, searchValue }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDateForDB = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDateForDB(startDate);
  const formattedEndDate = formatDateForDB(endDate);

  const handleSearch = (searchValue) => {
    // 필터링된 결과를 부모 컴포넌트로 전달
    if (onSearch) {
      onSearch(searchValue, formattedStartDate, formattedEndDate);
    }
  };

  const nowDateClick = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    handleSearch(searchValue, startDate, endDate); // 검색어가 없는 상태로 전체 데이터 검색
  };

  const monthDateClick = () => {
    const today = new Date();
    const newDay = new Date();
    newDay.setDate(today.getDate() - 30);

    setStartDate(newDay);
    setEndDate(today);
    handleSearch(searchValue, newDay, today); // 검색어가 없는 상태로 전체 데이터 검색
  };

  useEffect(() => {}, [startDate, endDate]);

  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    // DatePicker 값이 변경되면 검색 수행
    handleSearch(searchValue, startDate, endDate);
  };

  return (
    <div>
      <div className='searchDateText'>
        <h2>
          기간선택 <span>최근 1년 전까지 조회 가능</span>
        </h2>
      </div>
      <div className='searchDateForm'>
        <DatePicker
          dateFormat='yyyy년 MM월 dd일'
          locale={ko}
          selected={startDate}
          onChange={(date) => handleDateChange(date, 'start')}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />{' '}
        ~{' '}
        <DatePicker
          dateFormat='yyyy년 MM월 dd일'
          locale={ko}
          selected={endDate}
          onChange={(date) => handleDateChange(date, 'end')}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <button className='clinicSubBtn-mid' onClick={nowDateClick}>
          당일
        </button>
        <button className='clinicSubBtn-mid' onClick={monthDateClick}>
          최근1개월
        </button>
        <SearchBar
          type={'Date'}
          onSearch={handleSearch}
          startDate={formattedStartDate}
          endDate={formattedEndDate}
        />
      </div>
    </div>
  );
};

export default SearchDate;
