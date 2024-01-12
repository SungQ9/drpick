import React from 'react';
import CurrentList from './list';
import SearchDate from '../SearchDate';

const List = ({ data = [] }) => {
  const headers = data.headers;
  const items = data.items;
  const selectable = data.selectable;

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  return (
    <div className='listWrapper'>
      <div className='searchDateWrapper'>
        <SearchDate
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>
      <div className='listForm'>
        <CurrentList headers={headers} items={items} selectable={selectable} />
      </div>
    </div>
  );
};
export default List;
