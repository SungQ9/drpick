import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateTime from './DateTime';
import DateButton from './DateButton';
import back from '../../../../img/back-arrow-icon.png';
import calendar from '../../../../img/calendar-icon.png';

const SelectDateTime = () => {
  const navigate = useNavigate();
  const startTime = '09:00'; // 의사가 설정한 진료 시작 시간
  const endTime = '18:00'; // 의사가 설정한 진료 종료 시간

  const [buttonClicked, setButtonClicked] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        <DateTime startTime={startTime} endTime={endTime} />
      </div>
      <button
        style={{
          width: '650px',
          height: '80px',
          borderRadius: '15px',
          borderBottom: '30px',
        }}
        onClick={() => {
          console.log(
            'Selected Date:',
            selectedDate.toISOString().split('T')[0],
          );
          navigate('/clinic/application');
        }}
      >
        다음
      </button>
    </div>
  );
};

export default SelectDateTime;
