import React from 'react';

const ProfileEditList = ({ type, title }) => {
  if (type === 'doctor') {
    return (
      <div>
        <h2>{title}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{title}</h2>
      </div>
    );
  }
};

export default ProfileEditList;
