import React from 'react';
import { useLocation } from 'react-router-dom';
import Doctor from './doctor';
import Request from './request';

const DoctorManage = () => {
  const location = useLocation();

  const selectedComponent = location.state?.selectedComponent || 'default';

  return <div>{selectedComponent === 'doctor' ? <Doctor /> : <Request />}</div>;
};

export default DoctorManage;
