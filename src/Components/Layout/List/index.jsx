import React from 'react';
import CurrentList from './list';
import SearchDate from '../SearchDate';

const List = () => {
  const headers = [
    {
      text: '진료일',
      value: 'clinicDate',
    },
    {
      text: '병원이름',
      value: 'hopitalName',
    },
    {
      text: '의사이름',
      value: 'doctorName',
    },
    {
      text: '결제수단',
      value: 'payment',
    },
    {
      text: '상태',
      value: 'Status',
    },
  ];
  const items = [
    {
      clinicDate: '2024-01-27',
      hopitalName: '거구장병원',
      doctorName: '림의사',
      payment: '카드',
      Status: 'UN',
    },
    {
      clinicDate: '2024-01-27',
      hopitalName: '거구장병원',
      doctorName: '백의사',
      payment: '포인트',
      Status: 'UY',
    },
    {
      clinicDate: '2024-01-27',
      hopitalName: '거구장병원',
      doctorName: '규의사',
      payment: '카드',
      Status: 'UY',
    },
    {
      clinicDate: '2024-01-27',
      hopitalName: '거구장병원',
      doctorName: '정의사',
      payment: '카드',
      Status: 'UY',
    },
  ];
  const [startDate, setStartDate, endDate, setEndDate] = React.useState(
    new Date(),
  );

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
        <CurrentList headers={headers} items={items} />
      </div>
    </div>
  );
};
export default List;
