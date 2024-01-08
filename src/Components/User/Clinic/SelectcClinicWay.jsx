import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';
import subject from '../../../img/subject-icon.png';
import sympton from '../../../img/symptom-icon.png';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectClinicWay = () => {
  const navigate = useNavigate();
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

        <h1 className='stepTitle'>비대면진료신청</h1>
      </div>
      <div className='tableWrapper'>
        <table className='clinicTable'>
          <tbody>
            <tr>
              <td
                className='clinicBtn'
                onClick={() => {
                  navigate('/clinic/subject');
                }}
              >
                <img src={subject} alt='subject' />
                <h1>진료과목</h1>
              </td>
              <td
                className='clinicBtn'
                onClick={() => {
                  navigate('/clinic/symptom');
                }}
              >
                <img src={sympton} alt='sympton' />
                <h1>증상</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectClinicWay;
