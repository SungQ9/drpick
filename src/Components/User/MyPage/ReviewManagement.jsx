// 리뷰관리
import React from 'react';
import ListTitle from '../../Layout/List/ListTitle';
import List from '../../Layout/List';
import data from './sampledata/reviewData';

const ReviewManagement = () => {
  return (
    <div className='listWrapper'>
      <ListTitle title='리뷰관리' />
      <List data={data} />
    </div>
  );
};

export default ReviewManagement;
