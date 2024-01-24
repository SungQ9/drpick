import React from 'react';
import CurrentList from './CurrentList';
import SearchDate from '../SearchDate';
import Pagination from './Pagination';

const List = ({
  headers,
  items,
  type,
  style,
  searchBarStyle,
  buttonType,
  buttonName,
  handleSearch,
}) => {
  const selectable = false;
  console.log('List의 콘솔', items);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // DatePicker가 있는 목록
  if (type === 'Date') {
    return (
      <div>
        <div className='searchDateWrapper'>
          <SearchDate
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            type={type}
          />
        </div>
        <div className='listForm'>
          <CurrentList
            headers={headers}
            items={items}
            selectable={selectable}
            type={type}
            buttonType={buttonType}
            buttonName={buttonName}
            style={style}
            handleSearch={handleSearch}
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
          items={items}
          selectable={selectable}
          buttonType={buttonType}
          style={style}
          searchBarStyle={searchBarStyle}
          handleSearch={handleSearch}
        />
      </div>
    );
  }
};

export default List;
