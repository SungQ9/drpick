import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import { useClinicContext } from '../../Context/ClinicContext';
import axios from 'axios';
import useAlert from '../../Layout/Alert';

import Loading from '../ImageSearch/Loading';
import back from '../../../img/back-arrow-icon.png';
import doctor from '../../../img/doctor-icon.png';
import star from '../../../img/star-icon.png';

const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className='progress-bar'>
      <div
        className='progress-bar-fill'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const DoctorDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userAuth, userEmail, userId } = useTokenContext();
  const selectDoctor = location.state ? location.state.doctor : null;
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const clinicContext = useClinicContext();
  const showAlert = useAlert();

  const doctorHandler = (doctor) => {
    clinicContext.setClinicState((prevState) => ({
      ...prevState,
      selectDoctorId: doctor.doctorId,
      selectDoctor: doctor.doctorName,
    }));
    navigate(`/clinic/accept/`, { state: { doctorId: doctor.doctorId } });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userEmail: userEmail,
      userAuth: userAuth,
      memberId: userId,
      doctorId: selectDoctor.doctorId,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:8080/doctors/getDoctorReview',
          config,
        );
        setReviews(response.data);
      } catch (err) {
        console.error('의사 상세 에러 :', err);
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

  return (
    <div className='doctorDetailWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>{selectDoctor.doctorName}</h1>
      </div>
      <div className='doctorList'>
        <ul>
          <li
            className='doctor'
            style={{ borderBottom: 'none', cursor: 'default' }}
          >
            <div className='content'>
              <div className='name'>
                <h2>{selectDoctor.doctorName}</h2>
                <span>{selectDoctor.hospitalName}</span>
              </div>
              <div
                className='major'
                style={{ marginTop: '0px', marginBottom: '-15px' }}
              >
                <p>{selectDoctor.doctorMajor}</p>
              </div>
              <div
                className='status'
                style={{ fontSize: '20px', height: '100px' }}
              >
                <h5>접수가능</h5>
                <span>(수) 15:00 ~ 20:00</span>
              </div>
            </div>
            <img src={doctor} alt='doctor' />
          </li>
        </ul>
      </div>
      <div className='doctorDetail'>
        <ul>
          <li className='review'>
            {' '}
            <div className='grade'>
              <div className='reviewStat'>
                <img
                  src={star}
                  alt='star'
                  style={{ width: '25px', height: '25px' }}
                />{' '}
                <p style={{ marginLeft: '2px' }}>{reviews[0].ratingAvg}</p>{' '}
                <span style={{ marginLeft: '5px' }}>
                  ({reviews[0].ratingCnt}개)
                </span>
              </div>
              <div className='reviewText'>후기 {reviews[0].reviewCnt}개</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <p>친절하게 알려주셨어요 </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProgressBar
                  value={reviews[0].reviewTitleA}
                  max={reviews[0].reviewCnt}
                />
                <span style={{ margin: '0px 35px 0px 5px' }}>
                  ({reviews[0].reviewTitleA})
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <p>꼼꼼하게 진단해주셨어요 </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProgressBar
                  value={reviews[0].reviewTitleB}
                  max={reviews[0].reviewCnt}
                />
                <span style={{ margin: '0px 35px 0px 5px' }}>
                  ({reviews[0].reviewTitleB})
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <p>정확하게 처방해주셨어요</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProgressBar
                  value={reviews[0].reviewTitleC}
                  max={reviews[0].reviewCnt}
                />
                <span style={{ margin: '0px 35px 0px 5px' }}>
                  ({reviews[0].reviewTitleC})
                </span>
              </div>
            </div>
          </li>
          <li className='introduction'>
            <textarea
              readOnly
              value={selectDoctor.doctorComments}
              style={{ cursor: 'default' }}
            ></textarea>
          </li>
        </ul>
      </div>
      <button
        className='clinicBtn-mid'
        onClick={() => {
          doctorHandler(selectDoctor);
        }}
      >
        접수하기
      </button>
      <button
        className='clinicBtn-mid'
        style={{ background: '#AECCC8' }}
        onClick={() => {
          showAlert('병원전화번호', '02-0000-1234', 'info');
        }}
      >
        전화문의
      </button>
    </div>
  );
};

export default DoctorDetail;
