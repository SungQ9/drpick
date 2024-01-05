import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

import ClinicContext from '../../Context/ClinicContext';

import SelectClinicWay from './SelectcClinicWay'; // 과목,증상선택
import Subject from './Subject'; //진료과목선택
import Symptom from './Symptom'; // 진료증상선택
import SelectDoctor from './SelectDoctor'; // 의사선택
import DoctorDetail from './DoctorDetail'; // 의사상세
import SelectAccept from './SelectAccept'; // 접수방법선택(일반,예약)
import SelectDateTime from './SelectDateTime'; // 예약접수 날짜시간선택
import ApplicationForm from './ApplicationForm'; // 진료신청서(증상입력)
import SelectPayment from './SelectPayment'; // 결제수단선택
import AcceptComplete from './AcceptComplete'; // 접수완료

// 비대면 진료
const Clinic = () => {
  // Context에 설정한 훅으로 전역적으로 설정한 값들 생성
  const clinicContextProps = {
    testProp: '정하림은 추하림',
    testProp2: '추하림은 정하림',
    testProp3: '백두산 금강산',
    testProp4: '금강산은 백두산',
  };

  return (
    // Context.Provider로 라우터 감싸고 value로 지정한 값 전달
    // 이렇게 처리하면 해당 라우터안에 동일한 값 전달 가능
    <ClinicContext.Provider value={clinicContextProps}>
      <div className='mainContainer'>
        <div className='Form'>
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
          </Routes>
        </div>
      </div>
    </ClinicContext.Provider>
  );
};

export default Clinic;
