import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import MypageMain from './MypageMain';

const UserMyPage = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<MypageMain />} />
          <Route path='' element='' />
        </Routes>
      </div>
    </div>
  );
};

export default UserMyPage;
