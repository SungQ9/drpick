import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ListTitle from '../../Layout/List/ListTitle';
import List from '../../Layout/List';
import data from '../../SampleData/MemberData';
import data2 from '../../SampleData/inquiryData';
import data3 from '../../SampleData/reviewData';

const InquiryManage = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const [defaultData, setDefaultData] = useState(data);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (selectedType) {
      case 'user':
        setDefaultData(data);
        setTitle('회원관리');
        break;
      case 'doctor':
        setDefaultData(data2);
        setTitle('의사관리');
        break;
      case 'request':
        setDefaultData(data3);
        setTitle('등록요청목록');
        break;
      case 'hospital':
        setDefaultData(data);
        setTitle('병원관리');
        break;
      case 'drugstore':
        setDefaultData(data2);
        setTitle('약국관리');
        break;
      case 'userInquiry':
        setDefaultData(data3);
        setTitle('회원문의');
        break;
      case 'doctorInquiry':
        setDefaultData(data);
        setTitle('의사문의');
        break;
      case 'drugstoreInquiry':
        setDefaultData(data2);
        setTitle('약국문의');
        break;
    }
  }, [selectedType]);

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      <List data={defaultData} buttonType={'N'} type={'Date'} />
    </div>
  );
};

export default InquiryManage;
