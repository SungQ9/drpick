import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import SearchBar from "../SearchBar";
import axios from "axios";
import { useTokenContext } from "../../Context/TokenContext";

const SearchDate = ({ type, onSearch, searchValue, setSearchBarItem }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { token } = useTokenContext();

  const formatDateForDB = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const formattedStartDate = formatDateForDB(startDate);
  const formattedEndDate = formatDateForDB(endDate);
  const [itemsBydate, setItemsByDate] = useState([]);

  const handleSearch = async (searchValue, startDate, endDate) => {
    // DatePicker 값이 변경되면 검색 수행
    if (onSearch) {
      console.log("검색어:", searchValue);

      if (startDate && endDate) {
        console.log("시작 날짜:", startDate);
        console.log("종료 날짜:", endDate);
        // 여기에 DB로 요청을 보내는 로직을 추가
        try {
          const response = await axios.get(
            "http://localhost:8080/admin/getMemberInquiryListByDate",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
              },
            }
          );

          const data = response.data;
          setItemsByDate(data);
          // 여기서 받아온 데이터를 처리하거나 상태를 업데이트할 수 있음
          console.log("받아온 데이터 값 : ", data);

          // 받아온 데이터를 리스트 컴포넌트로 전달
          onSearch(searchValue, startDate, endDate, itemsBydate);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        // 검색어만 전달
        onSearch(searchValue, startDate, endDate);
      }
    }
  };

  const nowDateClick = () => {
    const currentDate = new Date();
    setStartDate(currentDate);
    setEndDate(currentDate);
    handleSearch(searchValue, currentDate, currentDate); // 검색어가 없는 상태로 전체 데이터 검색
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
    if (type === "startDate") {
      setStartDate(date);
      console.log(formatDateForDB(date));
    } else {
      setEndDate(date);
      console.log(formatDateForDB(date));
    }
    // DatePicker 값이 변경되면 검색 수행
    handleSearch(searchValue, startDate, endDate);
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
          onChange={(date) => handleDateChange(date, "startDate")}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />{" "}
        ~{" "}
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          locale={ko}
          selected={endDate}
          onChange={(date) => handleDateChange(date, "endDate")}
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
          type={"Date"}
          onSearch={handleSearch}
          startDate={formattedStartDate}
          endDate={formattedEndDate}
          items={itemsBydate}
          setSearchBarItem={setSearchBarItem}
        />
      </div>
    </div>
  );
};

export default SearchDate;
