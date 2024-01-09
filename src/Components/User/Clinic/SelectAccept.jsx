import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import back from '../../../img/back-arrow-icon.png';
import wait from '../../../img/wait-icon.png';
import calendar from '../../../img/calendar-icon.png';

const SelectAccept = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clinicContext = useClinicContext();

  clinicContext.selectDoctor = location.state ? location.state.doctor : null;

  const selectBtnHandler = (temp) => {
    clinicContext.acceptStatus = temp;
    if (temp === 'normal') {
      navigate('/clinic/application');
    } else {
      navigate('/clinic/datetime');
    }
    console.log(temp);
  };

  return (
    <div className='clinicWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />

        <h1 className='stepTitle'>접수방법선택</h1>
      </div>
      <div className='tableWrapper'>
        <table className='clinicTable'>
          <tbody>
            <tr>
              <td
                className='clinicBtn'
                onClick={() => {
                  selectBtnHandler('normal');
                }}
              >
                <img src={wait} alt='wait' />
                <h1>일반접수</h1>
              </td>
              <td
                className='clinicBtn'
                onClick={() => {
                  selectBtnHandler('time');
                }}
              >
                <img src={calendar} alt='calendar' />
                <h1>예약접수</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectAccept;
