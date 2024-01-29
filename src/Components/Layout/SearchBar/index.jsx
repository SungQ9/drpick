import React, { useState } from "react";
import { useModalContext } from "../../Context/ModalContext";

const SearchBar = ({
  type,
  props = [],
  searchBarStyle,
  placeholder,
  onSearch,
  startDate,
  endDate,
}) => {
  const [inputText, setInputText] = useState("");
  const { setSearchKeyword } = useModalContext(); // ModalContext에서 검색 키워드 가져오기
  const prop1 = props[0];
  const prop2 = props[1];
  const [key, setKey] = useState("");
  placeholder = "검색어를 입력하세요";

  const onChangeInput = (evt) => {
    const searchValue = evt.target.value;
    setInputText(searchValue);

    // 검색어가 변경될 때마다 결과 업데이트
    onSearch(searchValue);
    // setSearchKeyword(searchValue);
  };

  const handleSearch = () => {
    if (onSearch) {
      // 검색어와 날짜 정보를 함께 전달
      onSearch(inputText, startDate, endDate);
      setSearchKeyword(inputText);
    }
  };

  const handleReset = () => {
    // 입력창 초기화
    setInputText("");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // 이벤트 취소 추가

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
        <button className="clinicSubBtn-short" onClick={handleSearch}>
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
          // onKeyPress={handleSubmit}
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
