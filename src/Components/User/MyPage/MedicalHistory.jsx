import React from 'react';
import List from '../../Layout/List';
import ListTitle from '../../Layout/List/ListTitle';
import data from './sampledata/medicalhistoryData';

const MedicalHistory = () => {
  return (
    <div className='listWrapper'>
      <ListTitle title='진료내역조회' />
      <List data={data} />
    </div>
  );
};

export default MedicalHistory;
