import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/UserStyle.css';
import '../../../css/Style.css';

const SelectClinicWay = () => {
  const navigate = useNavigate();
  return (
    <div className='clinicWrapper'>
      <table className='clinicTable'>
        <tbody>
          <tr>
            <td
              className='clinicBtn'
              onClick={() => {
                navigate('/clinic/subject');
              }}
            >
              진료과목
            </td>
            <td
              className='clinicBtn'
              onClick={() => {
                navigate('/clinic/symptom');
              }}
            >
              증상
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SelectClinicWay;
