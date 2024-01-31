import React, { useEffect, useState } from "react";
import Select from "../../Select";

const time = [
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "11:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
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

const WorkTime = ({ style, onRadioChange, doctorAvailability }) => {
  const [selectedDay, setSelectedDay] = useState({ week });
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (doctorAvailability) {
      setAvailability(doctorAvailability);
    }
  }, [doctorAvailability]);

  /* 수정해야 함 */
  // useEffect(() => {
  //   // Availability가 변경되면 선택된 날짜를 설정
  //   if (availability.length > 0) {
  //     const selectedDays = {};
  //     availability.forEach((item) => {
  //       selectedDays[item.day] = true;
  //     });
  //     setSelectedDay(selectedDays);
  //   }
  // }, [availability]);

  const handleRadioChange = (day) => {
    console.log(day, "클릭");
    setSelectedDay((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
    onRadioChange(day);
  };

  const getAvailabilityForDay = (day) => {
    const dayAvailability = availability.find((item) => item.day === day);
    // console.log("WorkTime", dayAvailability);
    return dayAvailability || { startTime: "", endTime: "" };
  };

  return (
    <table className="worktime-table" style={style}>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("monday")}
            checked={selectedDay.monday}
          />
          <h4>월요일</h4>
          <Select
            id="mondayStartTime"
            className={
              selectedDay.monday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("월요일").starttime}
            disabled={!selectedDay.monday}
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            id="mondayEndTime"
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("월요일").endtime}
            className={
              selectedDay.monday ? "select-enabled" : "select-disabled"
            }
            disabled={!selectedDay.monday}
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("tuesday")}
            checked={selectedDay.tuesday}
          />
          <h4>화요일</h4>
          <Select
            className={
              selectedDay.tuesday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("화요일").starttime}
            disabled={!selectedDay.tuesday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.tuesday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("화요일").endtime}
            disabled={!selectedDay.tuesday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("wednesday")}
            checked={selectedDay.wednesday}
          />
          <h4>수요일</h4>
          <Select
            className={
              selectedDay.wednesday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("수요일").starttime}
            disabled={!selectedDay.wednesday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.wednesday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("수요일").endtime}
            disabled={!selectedDay.wednesday}
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("thursday")}
            checked={selectedDay.thursday}
          />
          <h4>목요일</h4>
          <Select
            className={
              selectedDay.thursday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("목요일").starttime}
            disabled={!selectedDay.thursday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.thursday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("목요일").endtime}
            disabled={!selectedDay.thursday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("friday")}
            checked={selectedDay.friday}
          />
          <h4>금요일</h4>
          <Select
            className={
              selectedDay.friday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("금요일").starttime}
            disabled={!selectedDay.friday}
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            className={
              selectedDay.friday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("금요일").endtime}
            disabled={!selectedDay.friday}
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("saturday")}
            checked={selectedDay.saturday}
          />
          <h4>토요일</h4>
          <Select
            className={
              selectedDay.saturday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("토요일").starttime}
            disabled={!selectedDay.saturday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.saturday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("토요일").endtime}
            disabled={!selectedDay.saturday}
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("sunday")}
            checked={selectedDay.sunday}
          />
          <h4>일요일</h4>
          <Select
            className={
              selectedDay.sunday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("일요일").starttime}
            disabled={!selectedDay.sunday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.sunday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("일요일").endtime}
            disabled={!selectedDay.sunday}
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("holiday")}
            checked={selectedDay.holiday}
          />
          <h4>공휴일</h4>
          <Select
            className={
              selectedDay.holiday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("공휴일").starttime}
            disabled={!selectedDay.holiday}
          />
        </td>
        ~
        <td>
          <Select
            className={
              selectedDay.holiday ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("공휴일").endtime}
            disabled={!selectedDay.holiday}
          />
        </td>
      </tr>
    </table>
  );
};
export default WorkTime;
