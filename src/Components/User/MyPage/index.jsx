import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import MypageMain from './MypageMain';
import UserManagement from './UserManagement';
import UserProfileEdit from './UserProfileEdit';
import PaymentManagement from './PaymentManagement';
import Video from '../Clinic/ApplicationForm/ClinicRoom/VideoChat';
import Modal from '../../Layout/Modal/ModalOpen';

const UserMyPage = () => {
  return (
    <div className='mainContainer'>
      <div className='mypageForm'>
        <Routes>
          <Route path='/' element={<MypageMain />} />
          <Route path='/manager' element={<UserManagement />} />
          <Route path='/profileEdit' element={<UserProfileEdit />} />
          <Route path='/payment' element={<PaymentManagement />} />
          <Route path='/video/:roomName' element={<Video />} />
          <Route path='/modal' element={<Modal />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserMyPage;
