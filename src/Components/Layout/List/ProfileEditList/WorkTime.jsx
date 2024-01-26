import React, { useState } from 'react';
import Select from '../../Select';

const time = [
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '11:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
];

const week = [
  {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    holiday: false,
  },
];

const WorkTime = ({ style }) => {
  const [selectedDay, setSelectedDay] = useState({ week });

  const handleRadioChange = (day) => {
    console.log(day, '클릭');
    setSelectedDay((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <table className='worktime-table' style={style}>
      <tr>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('monday')}
            checked={selectedDay.monday}
          />
          <h4>월요일</h4>
          <Select
            id="mondayEndTime"
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.monday}
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.monday}
          />
        </td>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('tuesday')}
            checked={selectedDay.tuesday}
          />
          <h4>화요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.tuesday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.tuesday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('wednesday')}
            checked={selectedDay.wednesday}
          />
          <h4>수요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.wednesday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.wednesday}
          />
        </td>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('thursday')}
            checked={selectedDay.thursday}
          />
          <h4>목요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.thursday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.thursday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('friday')}
            checked={selectedDay.friday}
          />
          <h4>금요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.friday}
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.friday}
          />
        </td>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('saturday')}
            checked={selectedDay.saturday}
          />
          <h4>토요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.saturday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.saturday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('sunday')}
            checked={selectedDay.sunday}
          />
          <h4>일요일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.sunday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.sunday}
          />
        </td>
        <td>
          <input
            type='checkbox'
            style={{ width: '15px' }}
            onChange={() => handleRadioChange('holiday')}
            checked={selectedDay.holiday}
          />
          <h4>공휴일</h4>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.holiday}
          />
        </td>
        ~
        <td>
          <Select
            options={time}
            style={{ width: '100px' }}
            disabled={!selectedDay.holiday}
          />
        </td>
      </tr>
    </table>
  );
};
export default WorkTime;
