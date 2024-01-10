import React from 'react';

import UserMain from './UserMain';
import DoctorMain from './DoctorMain';
import DrugStoreMain from './DrugStoreMain';
import AdminMain from './AdminMain';
import '../../css/UserStyle.css';
import '../../css/Style.css';

const Main = () => {
  const Auth = localStorage.getItem('memberAuth');

  let DefaultMain = <UserMain />;

  if (Auth) {
    switch (Auth) {
      case 'D':
        DefaultMain = <DoctorMain />;
        break;
      case 'S':
        DefaultMain = <DrugStoreMain />;
        break;
      case 'A':
        DefaultMain = <AdminMain />;
        break;
      default:
        break;
    }
  }

  return <div className='mainContainer'>{DefaultMain}</div>;
};

export default Main;
