import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Kakao from './map';
import HospitalList from './hospitalList';

const SearchHospital = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        {/* 작업할때 h4 태그 지우시고 루트경로 맞춰서 컴포넌트만 변경해주세요 */}
        <h4>병원검색</h4>
        <Routes>
          <Route exact path='/' element={<HospitalList />} />
          <Route path='/map' element={<Kakao />} />
        </Routes>
      </div>
    </div>
  );
};

export default SearchHospital;
