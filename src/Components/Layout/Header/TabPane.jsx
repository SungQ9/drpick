import React from 'react';
import UserTab from '../../User/UserTab';

import '../../../css/Style.css';

// 유저 종류에 따라 menu값으로 넘겨서 메뉴 찍기

const TabPane = ({ menu }) => {
  return (
    <div className='tabPane'>
      <UserTab />
    </div>
  );
};

export default TabPane;
