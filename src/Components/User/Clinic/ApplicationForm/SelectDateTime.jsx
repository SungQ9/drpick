import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../../Context/ClinicContext';
import DateTime from './DateTime';
import DateButton from './DateButton';
import back from '../../../../img/back-arrow-icon.png';
import calendar from '../../../../img/calendar-icon.png';

const SelectDateTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clinicContext = useClinicContext();
  const doctorId = location.state ? location.state.doctorId : null;
  const startTime = '09:00'; // 의사가 설정한 진료 시작 시간
  const endTime = '18:00'; // 의사가 설정한 진료 종료 시간

  const [buttonClicked, setButtonClicked] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleNextClick = () => {
    const date = selectedDate;
    const time = selectedTime; // 'DateTime' 컴포넌트에서 선택된 시간 (예: '15:30')

    // 'YYYY-MM-DD' 형식으로 날짜 포맷팅
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 날짜와 시간 결합
    const dateTime = `${formattedDate} ${time}`;

    // 상태 업데이트 및 데이터베이스에 저장
    clinicContext.setClinicState((prevState) => ({
      ...prevState,
      selectDate: dateTime,
    }));
    console.log('SelectDateTime에서 마지막으로 지정한 시간:', dateTime);

    // 페이지 이동
    navigate('/clinic/application', { state: { doctorId } });
  };

  return (
    <div className='selectDateTimeWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>진료신청서</h1>
      </div>
      <div className='selectDateWrapper'>
        <div className='selectDateText'>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={calendar}
              alt='calendar'
              style={{ width: '40px', height: '40px' }}
            />
            날짜
          </h2>
        </div>
        <div className='selectDateBtn'>
          <DateButton
            onClick={() => setButtonClicked(true)}
            isSelected={buttonClicked}
            label='오늘'
            setDateValue={setSelectedDate}
          />
          <DateButton
            onClick={() => setButtonClicked(false)}
            isSelected={!buttonClicked}
            label='내일'
            setDateValue={setSelectedDate}
          />
        </div>
      </div>
      <div className='doctorTimeWrapper'>
        <DateTime
          startTime={startTime}
          endTime={endTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <button
        style={{
          width: '650px',
          height: '80px',
          borderRadius: '15px',
          borderBottom: '30px',
        }}
        onClick={handleNextClick}
      >
        다음
      </button>
    </div>
  );
};

export default SelectDateTime;
