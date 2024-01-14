import React from 'react';
import CurrentList from './CurrentList';
import SearchDate from '../SearchDate';

const List = ({
  data = [],
  type,
  style,
  searchBarStyle,
  buttonType,
  buttonName,
}) => {
  const headers = data.headers;
  const items = data.items;
  const selectable = data.selectable;

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
        />
      </div>
    );
  }
};

export default List;
