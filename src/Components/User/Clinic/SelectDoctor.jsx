import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import Loading from '../ImageSearch/Loading';
import star from '../../../img/star-icon.png';
import back from '../../../img/back-arrow-icon.png';
import doctor from '../../../img/doctor-icon.png';

const SelectDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userAuth, userEmail, userId } = useTokenContext();
  const selectSubject = location.state ? location.state.subject : null;
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const doctorHandler = (name, item) => {
    console.log('Selected Doctor:', name);
    navigate(`/clinic/detail/`, { state: { doctor: item } });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userEmail: userEmail,
      userAuth: userAuth,
      memberId: userId,
      doctorSubject: selectSubject,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:8080/doctors/getDoctorClinicList',
          config,
        );
        setDoctors(response.data);
      } catch (err) {
        console.error('의사 목록 에러 :', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div>
        <div className='titleWrapper'>
          <img
            className='backIcon'
            src={back}
            onClick={() => {
              navigate(-1);
            }}
            alt='back'
          />
          <h1 className='stepTitle' style={{ marginLeft: '280px' }}>
            등록된 의사가 없습니다{' '}
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className='selectDoctorWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>{selectSubject}</h1>
      </div>
      <div className='doctorList'>
        <ul>
          {doctors.map((item) => (
            <li
              key={item.doctorId}
              className='doctor'
              onClick={() => doctorHandler(item.doctorName, item)}
            >
              <div className='content'>
                <div className='name'>
                  <h2>{item.doctorName}</h2>
                  <span>{item.hospitalName}</span>
                </div>
                <div className='grade'>
                  <img
                    src={star}
                    alt='star'
                    style={{ width: '25px', height: '25px' }}
                  />{' '}
                  <p>{item.rating}</p> <span>(200+)</span>
                </div>
                <div className='status'>
                  {/* 의사 진료시간이랑 비교해서 진료시간 내면 접수가능, 아니면 불가능   */}
                  <h5>접수가능</h5>
                  {/* 의사 진료시간  */}
                  <span>(수) 15:00 ~ 20:00</span>
                </div>
                <div className='major'>
                  <p>{item.doctorMajor}</p>
                </div>
              </div>
              {/* 파일연동해서 의사 사진  */}
              <img src={doctor} alt='doctor' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectDoctor;
