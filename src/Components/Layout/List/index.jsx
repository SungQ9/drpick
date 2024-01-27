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
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredDateItems, setFilteredDateItems] = React.useState(items);

  const handleSearch = (value, startDate, endDate) => {
    console.log("검색어:", value);
    console.log("시작 날짜:", startDate);
    console.log("종료 날짜:", endDate);

    setSearchValue(value);

    const filteredItems = items.filter((item) =>
      headers.some((header) => {
        if (
          type === "Date" &&
          header.value === "inquiryRegdate" &&
          item[header.value]
        ) {
          const inquiryDate = new Date(item[header.value]);
          const isDateInRange =
            inquiryDate >= new Date(startDate) &&
            inquiryDate <= new Date(endDate);

          const includesSearchValue =
            !value ||
            (item[header.value] &&
              typeof item[header.value] === "string" &&
              item[header.value].includes(value));

          return isDateInRange || includesSearchValue;
        } else {
          return (
            item[header.value] &&
            typeof item[header.value] === "string" &&
            item[header.value].includes(value)
          );
        }
      })
    );

    setFilteredDateItems(filteredItems);
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
            onSearch={(value, start, end) => handleSearch(value, start, end)}
            searchValue={searchValue}
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
            style={style}
            handleSearch={handleSearch}
            filteredDateItems={filteredDateItems}
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
          style={style}
          searchBarStyle={searchBarStyle}
          handleSearch={handleSearch}
        />
      </div>
    );
  }
};

export default List;
