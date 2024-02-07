import React, { useEffect } from 'react';
import CurrentList from './CurrentList';
import SearchDate from '../SearchDate';

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
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredDateItems, setFilteredDateItems] = React.useState(items);
  const [searchBarItem, setSearchBarItem] = React.useState([]);

  const handleSearch = (value, startDate, endDate) => {
    setSearchValue(value);

    const filteredItems = items.filter((item) => {
      let isDateValid = true;

      // 날짜 필드 결정
      const dateField = item.inquiryRegdate
        ? 'inquiryRegdate'
        : item.certificateDate
        ? 'certificateDate'
        : null;

      if (startDate || (endDate && dateField)) {
        const itemDate = new Date(item[dateField]);
        const start = startDate ? new Date(startDate) : new Date('2022-01-01');
        const end = endDate ? new Date(endDate) : new Date();
        isDateValid =
          (!itemDate || itemDate >= start) && (!itemDate || itemDate <= end);
      }

      const isKeywordValid =
        !value ||
        headers.some((header) => {
          const headerValue = item[header.value];
          return (
            headerValue &&
            typeof headerValue === 'string' &&
            headerValue.toLowerCase().includes(value.toLowerCase())
          );
        });

      return isDateValid && isKeywordValid;
    });

    setFilteredDateItems(filteredItems);
  };

  useEffect(() => {
    setFilteredDateItems(items);
  }, [items]);

  // DatePicker가 있는 목록
  if (type === 'Date') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className='searchDateWrapper'>
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
        <div className='listForm'>
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
      <div className='listForm'>
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
