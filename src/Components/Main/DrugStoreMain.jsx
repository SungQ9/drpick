import React from 'react';
import '../../css/UserStyle.css';
import '../../css/Style.css';
import { useNavigate } from 'react-router-dom';

const DrugStoreMain = () => {
  const navigate = useNavigate();

  return (
    <div className=''>
      <h1>약국메인</h1>
    </div>
  );
};

export default DrugStoreMain;
