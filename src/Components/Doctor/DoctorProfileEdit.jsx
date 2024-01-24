import React from 'react';
import ProfileEditList from '../Layout/List/ProfileEditList/ProfileEditList';

const DoctorProfileEdit = () => {
  return (
    <div>
      <ProfileEditList type={'doctor'} title={'의사정보수정'} />
    </div>
  );
};

export default DoctorProfileEdit;
