import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import List from '../../Layout/List';
import ListTitle from '../../Layout/List/ListTitle';
import data from '../../SampleData/medicalhistoryData';
import data2 from '../../SampleData/inquiryData';
import data3 from '../../SampleData/reviewData';

const UserManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const [defaultData, setDefaultData] = useState(data);
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log('실행');
    // eslint-disable-next-line default-case
    switch (selectedType) {
      case 'history':
        setDefaultData(data);
        setTitle('진료내역조회');
        break;
      case 'inquiry':
        setDefaultData(data2);
        setTitle('1:1문의');
        break;
      case 'review':
        setDefaultData(data3);
        setTitle('리뷰관리');
        break;
    }
  }, [selectedType]);

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      <List data={defaultData} type='Date' />
    </div>
  );
};

export default UserManagement;
