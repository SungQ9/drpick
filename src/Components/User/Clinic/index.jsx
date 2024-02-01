import React from 'react';
import { Routes, Route, useLocation, Redirect } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import ClinicProvider from '../../Context/ClinicContext';
import { VideoChatProvider } from '../../Context/VideoChatContext';
import SelectClinicWay from './SelectcClinicWay'; // 과목,증상선택
import Subject from './Subject'; //진료과목선택
import Symptom from './Symptom'; // 진료증상선택
import SelectDoctor from './SelectDoctor'; // 의사선택
import DoctorDetail from './DoctorDetail'; // 의사상세
import SelectAccept from './SelectAccept'; // 접수방법선택(일반,예약)
import SelectDateTime from './ApplicationForm/SelectDateTime'; // 예약접수 날짜시간선택
import ApplicationForm from './ApplicationForm/ApplicationForm'; // 진료신청서(증상입력)
import SelectPayment from './SelectPayment'; // 결제수단선택
import AcceptComplete from './AcceptComplete'; // 접수완료
import ClinicRoom from './ApplicationForm/ClinicRoom'; // 비대면 진료실
import Video from './ApplicationForm/ClinicRoom/VideoChat/index';
import SelectPillsReceive from './SelectPillsReceive/index';

// 비대면 진료
const Clinic = () => {
  const location = useLocation();
  const isVideoRoute = location.pathname.includes('/room/');
  return (
    <ClinicProvider>
      <VideoChatProvider>
        <div className='mainContainer'>
          <div className={isVideoRoute ? 'mypageForm' : 'Form'}>
            <Routes>
              <Route path='/' element={<SelectClinicWay />} />
              <Route path='/subject' element={<Subject />} />
              <Route path='/symptom' element={<Symptom />} />
              <Route path='/doctor' element={<SelectDoctor />} />
              <Route path='/detail' element={<DoctorDetail />} />
              <Route path='/accept' element={<SelectAccept />} />
              <Route path='/datetime' element={<SelectDateTime />} />
              <Route path='/application' element={<ApplicationForm />} />
              <Route path='/payment' element={<SelectPayment />} />
              <Route path='/complete' element={<AcceptComplete />} />

              <Route path='/room/:certificateNum' element={<ClinicRoom />} />

              <Route path='/pill' element={<SelectPillsReceive />} />
            </Routes>
          </div>
        </div>
      </VideoChatProvider>
    </ClinicProvider>
  );
};

export default Clinic;
