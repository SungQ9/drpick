import React from 'react';
import TopHeader from './TopHeader';
import TabPane from './TabPane';
import '../../../css/LayoutStyle.css';

const Header = () => {
  return (
    <div className='headerContainer'>
      <TopHeader />
      <TabPane />
    </div>
  );
};

export default Header;
