import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import MypageMain from './MypageMain';
import MedicalHistory from './MedicalHistory';
import Inquiry from './Inquiry';
import UserProfileEdit from './UserProfileEdit';
import PaymentManagement from './PaymentManagement';
import ReviewManagement from './ReviewManagement';

const UserMyPage = () => {
  return (
    <div className='mainContainer'>
      <div className='mypageForm'>
        <Routes>
          <Route path='/' element={<MypageMain />} />
          <Route path='/history' element={<MedicalHistory />} />
          <Route path='/inquiry' element={<Inquiry />} />
          <Route path='/profileEdit' element={<UserProfileEdit />} />
          <Route path='/payment' element={<PaymentManagement />} />
          <Route path='/review' element={<ReviewManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserMyPage;
