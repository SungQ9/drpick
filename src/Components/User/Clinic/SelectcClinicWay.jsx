import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import { useClinicContext } from '../../Context/ClinicContext';
import back from '../../../img/back-arrow-icon.png';
import subject from '../../../img/subject-icon.png';
import sympton from '../../../img/symptom-icon.png';

const SelectClinicWay = () => {
  const { token, userId } = useTokenContext();
  const navigate = useNavigate();

  const clinicContext = useClinicContext();
  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 리디렉트
    if (!token) {
      alert('로그인이 필요한 서비스입니다');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleClick = (temp) => {
    clinicContext.setClinicState((prev) => ({
      ...prev,
      memberId: userId,
    }));
    if (temp === '증상') {
      navigate('/clinic/symptom');
    } else if (temp === '과목') {
      navigate('/clinic/subject');
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

        <h1 className='stepTitle'>비대면진료신청</h1>
      </div>
      <div className='tableWrapper'>
        <table className='clinicTable'>
          <tbody>
            <tr>
              <td
                className='clinicBtn'
                onClick={() => {
                  handleClick('과목');
                }}
              >
                <img src={subject} alt='subject' />
                <h1>진료과목</h1>
              </td>
              <td
                className='clinicBtn'
                onClick={() => {
                  handleClick('증상');
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
