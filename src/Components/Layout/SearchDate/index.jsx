import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import SearchBar from "../SearchBar";

const SearchDate = ({ type, onSearch }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환하는 함수
  const formatDateForDB = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDateForDB(startDate);
  const formattedEndDate = formatDateForDB(endDate);

  const handleSearch = (searchValue) => {
    // 검색 로직을 수행
    console.log("검색어:", searchValue);

    // 검색어만 전달
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const nowDateClick = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };
  const monthDateClick = () => {
    const today = new Date();
    const newDay = new Date();
    newDay.setDate(today.getDate() - 30);

    setStartDate(newDay);
    setEndDate(today);
  };

  return (
    <div>
      <div className="searchDateText">
        <h2>
          기간선택 <span>최근 1년 전까지 조회 가능</span>
        </h2>
      </div>
      <div className="searchDateForm">
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />{" "}
        ~{" "}
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <button className="clinicSubBtn-mid" onClick={nowDateClick}>
          당일
        </button>
        <button className="clinicSubBtn-mid" onClick={monthDateClick}>
          최근1개월
        </button>
        <SearchBar
          type={type}
          props={[formattedStartDate, formattedEndDate]}
          onSearch={handleSearch}
        />
        {/* <button className='clinicSubBtn-short' onClick={handleSearch}>
          검색
        </button> */}
      </div>
    </div>
  );
};

export default SearchDate;
