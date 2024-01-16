import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';
import data from '../SampleData/medicalhistoryData';
import data2 from '../SampleData/inquiryData';

const DoctorManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const [defaultData, setDefaultData] = useState(data);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (selectedType) {
      case 'history':
        setDefaultData(data);
        setTitle('진료기록조회');
        break;
      case 'inquiry':
        setDefaultData(data2);
        setTitle('문의내역');
        break;
    }
  }, [selectedType]);

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      {selectedType === 'history' && (
        <List data={defaultData} type='Date' buttonType={''} />
      )}
      {selectedType === 'inquiry' && (
        <List data={defaultData} type='Date' buttonType='Y' buttonName='작성' />
      )}
    </div>
  );
};

export default DoctorManagement;
