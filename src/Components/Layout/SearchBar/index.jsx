import React, { useState } from "react";
import { useModalContext } from "../../Context/ModalContext";

const SearchBar = ({
  type,
  items = [],
  searchBarStyle,
  placeholder,
  onSearch,
  startDate,
  endDate,
  setSearchBarItem,
}) => {
  const [inputText, setInputText] = useState("");
  const { setSearchKeyword } = useModalContext(); // ModalContext에서 검색 키워드 가져오기
  placeholder = "검색어를 입력하세요";
  console.log("SearchBar 아이템 :", items);

  const onChangeInput = (evt) => {
    const searchValue = evt.target.value;
    setInputText(searchValue);
    setSearchKeyword(searchValue);
    setSearchBarItem(items);
    // 검색어가 변경될 때마다 결과 업데이트
    onSearch(searchValue, startDate, endDate); // items 추가
    setSearchKeyword(searchValue);
  };

  const handleSearch = () => {
    if (onSearch) {
      // 검색어와 날짜 정보를 전달
      onSearch(inputText, startDate, endDate, items); // items 추가
      setSearchKeyword(inputText);
    }
    console.log("SearchBar : ", inputText, startDate, endDate);
  };

  const handleReset = () => {
    // 입력창 초기화
    setInputText("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // 엔터 키 눌렀을 때는 초기화하지 않도록 수정
    if (evt.key === "Enter") {
      return;
    }
    handleSearch();
  };

  if (type === "Date") {
    return (
      <form onSubmit={handleSubmit} className="searchBarWrapper">
        <input
          value={inputText}
          onChange={onChangeInput}
          type="text"
          placeholder={placeholder}
        />
        <button
          className="clinicSubBtn-short"
          onClick={(evt) => handleSearch(evt)}
        >
          검색
        </button>
      </form>
    );
  } else if (type === "Chat") {
    return (
      <form onSubmit={handleSubmit} className="searchBarWrapper">
        <input
          style={{ width: "370px", height: "50px" }}
          value={inputText}
          onChange={onChangeInput}
          type="text"
          placeholder={placeholder}
        />
        <button
          className="clinicSubBtn-short"
          onClick={handleSearch}
          style={{ width: "120px", height: "50px" }}
        >
          입력
        </button>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="searchBarWrapper"
        style={searchBarStyle}
      >
        <input
          value={inputText}
          onChange={onChangeInput}
          type="text"
          placeholder={placeholder}
        />
        <button
          className="listBtn-short"
          onClick={handleReset}
          style={{ background: "#aeccc8" }}
        >
          {" "}
          초기화
        </button>
      </form>
    );
  }
};

export default SearchBar;
