import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/LayoutStyle.css';

const A0 = () => {
  const navigate = useNavigate();
  return (
    <div className='clinicWrapper'>
      <table className='clinicTable'>
        <tbody>
          <tr>
            <td
              className='clinicBtn'
              onClick={() => {
                navigate('/clinic/a1');
              }}
            >
              진료과목
            </td>
            <td
              className='clinicBtn'
              onClick={() => {
                navigate('/clinic/a2');
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

export default A0;
