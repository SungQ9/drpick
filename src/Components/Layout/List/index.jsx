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
  listType,
  buttonType,
  buttonName,
  selectable,
  onDeleteReviews,
  onReviewSelect,
  selectedReviews,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredDateItems, setFilteredDateItems] = React.useState(items);
  const [searchBarItem, setSearchBarItem] = React.useState([]);

  const handleSearch = (value, startDate, endDate) => {
    console.log("검색어:", value);
    console.log("시작날짜:", startDate);
    console.log("종료날짜:", endDate);
    setSearchValue(value);
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
            items={items}
            headers={headers}
            onSearch={(value, startDate, endDate, items) =>
              handleSearch(value, startDate, endDate, items)
            }
            searchValue={searchValue}
            setSearchBarItem={setSearchBarItem}
          />
        </div>
        <div className="listForm">
          <CurrentList
            headers={headers}
            items={items} // 필터링된 결과 사용
            type={type}
            selectable={selectable}
            buttonType={buttonType}
            buttonName={buttonName}
            listbutton={listbutton}
            listType={listType}
            style={style}
            handleSearch={handleSearch}
            filteredDateItems={filteredDateItems}
            onDeleteReviews={onDeleteReviews}
            onReviewSelect={onReviewSelect}
            selectedReviews={selectedReviews}
            searchBarItem={searchBarItem}
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
          items={filteredDateItems} // 기본 데이터들 사용
          selectable={selectable}
          buttonType={buttonType}
          buttonName={buttonName}
          listbutton={listbutton}
          listType={listType}
          style={style}
          searchBarStyle={searchBarStyle}
          handleSearch={handleSearch}
        />
      </div>
    );
  }
};

export default List;
