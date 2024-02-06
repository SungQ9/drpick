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
  const doctorId = location.state ? location.state.doctorId : null;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  // 선택한 방법에 따라 다른 페이지로 이동하면서 clinicContext에 대기방법 업데이트
  const selectBtnHandler = (temp) => {
    if (temp === 'normal') {
      clinicContext.setClinicState((prevState) => ({
        ...prevState,
        selectDate: formattedDate,
        acceptStatus: 'W',
      }));
      navigate('/clinic/application', { state: { doctorId } });
    } else {
      clinicContext.setClinicState((prevState) => ({
        ...prevState,
        acceptStatus: 'R',
      }));
      navigate('/clinic/datetime', { state: { doctorId } });
    }
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
