import React, { useState } from 'react';
import clock from '../../../../img/clock-icon.png';

const generateTimeSlots = (startTime, endTime, interval) => {
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    timeSlots.push(currentTime);
    const [hours, minutes] = currentTime.split(':').map(Number);
    currentTime = `${(hours + Math.floor((minutes + interval) / 60))
      .toString()
      .padStart(2, '0')}:${((minutes + interval) % 60)
      .toString()
      .padStart(2, '0')}`;
  }

  return timeSlots;
};

const DateTime = ({ startTime, endTime, setSelectedTime }) => {
  const [selectedTime, setSelectedTimeState] = useState(null);

  const interval = 20; // 진료 간격 (20분)

  const timeSlots = generateTimeSlots(startTime, endTime, interval);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setSelectedTimeState(time);
  };

  return (
    <div className='timeTableWrapper'>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={clock}
          alt='clock'
          style={{ width: '40px', height: '40px' }}
        />
        시간
      </h2>
      <table
        className='timeTable'
        style={{ border: '1px solid #cecece', borderRadius: '15px' }}
      >
        <tbody>
          {timeSlots.map((time, index) => (
            <tr key={index}>
              <td
                style={{
                  backgroundColor:
                    selectedTime === time ? '#11C2AD' : 'transparent',
                  color: selectedTime === time ? '#FFFFFF' : '#727272',
                  border:
                    selectedTime === time
                      ? '1px solid #FFFFFF'
                      : '1px solid #cecece',
                }}
                onClick={() => handleSelectTime(time)}
              >
                {time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DateTime;
