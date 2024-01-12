import React from 'react';
import { useState, useLocation } from 'react-router-dom';

const InquiryManage = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';

  return (
    <div>
      <h2>문의관리</h2>
    </div>
  );
};

export default InquiryManage;
