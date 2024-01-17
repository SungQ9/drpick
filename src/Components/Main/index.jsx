import React from 'react';

import UserMain from './UserMain';
import DoctorMain from '../Doctor/index';
import DrugMain from '../DrugStrore/index';
import AdminMain from '../Admin/index';
import '../../css/UserStyle.css';
import '../../css/Style.css';

const Main = () => {
  const Auth = localStorage.getItem('userAuth');

  let DefaultMain = <UserMain />;

  if (Auth) {
    switch (Auth) {
      case 'D':
        DefaultMain = <DoctorMain />;
        break;
      case 'S':
        DefaultMain = <DrugMain />;
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
