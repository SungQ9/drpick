// HospitalSearch.js

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../../../css/HospitalList.css";

const HospitalSearch = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    const trimmedKeyword = searchKeyword.replace(/\s+/g, ""); // 정규표현식을 사용하여 모든 공백 제거
    onSearch(trimmedKeyword);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="병원을 검색하세요"
        className="searchInput"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button className="searchBtn" onClick={handleSearch}>
        <AiOutlineSearch size={25} />
      </button>
    </div>
  );
};

export default HospitalSearch;
