// 1:1문의
import React from 'react';
import ListTitle from '../../Layout/List/ListTitle';
import List from '../../Layout/List';
import data from './sampledata/inquiryData';

const Inquiry = () => {
  return (
    <div className='listWrapper'>
      <ListTitle title='1:1문의' />
      <List data={data} />
    </div>
  );
};

export default Inquiry;
