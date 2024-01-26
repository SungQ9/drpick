import React from "react";
import CurrentList from "./CurrentList";
import SearchDate from "../SearchDate";

const List = ({
  headers,
  items,
  type,
  style,
  searchBarStyle,
  listbutton,
  buttonType,
  buttonName,
  selectable,
}) => {
  console.log("List의 콘솔", items);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // 검색어만 업데이트를 위한 함수
  const handleSearch = (searchValue) => {
    // 검색어를 콘솔에 출력
    console.log("검색어:", searchValue);

    // 여기에 필요한 검색 로직을 추가

    // 이후에 필요한 로직을 추가하세요
  };

  // DatePicker가 있는 목록
  if (type === "Date") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="searchDateWrapper">
          <SearchDate
            onSearch={handleSearch} // 검색어만 넘김
          />
        </div>
        <div className="listForm">
          <CurrentList
            headers={headers}
            items={items}
            selectable={selectable}
            type={type}
            buttonType={buttonType}
            buttonName={buttonName}
            listbutton={listbutton}
            style={style}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    );
  } else {
    // 일반 목록
    return (
      <div className="listForm">
        <CurrentList
          headers={headers}
          items={items}
          selectable={selectable}
          buttonType={buttonType}
          buttonName={buttonName}
          listbutton={listbutton}
          style={style}
          searchBarStyle={searchBarStyle}
          handleSearch={handleSearch}
        />
      </div>
    );
  }
};

export default List;
