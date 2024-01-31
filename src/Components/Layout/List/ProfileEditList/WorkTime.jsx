import React, { useEffect, useState } from "react";
import Select from "../../Select";

const time = [
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
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
    월요일: false,
    화요일: false,
    수요일: false,
    목요일: false,
    금요일: false,
    토요일: false,
    일요일: false,
    공휴일: false,
  },
];

const dayAbbreviations = {
  월요일: "monday",
  화요일: "tuesday",
  수요일: "wednesday",
  목요일: "thursday",
  금요일: "friday",
  토요일: "saturday",
  일요일: "sunday",
  공휴일: "holiday",
};

const WorkTime = ({ style, onRadioChange, doctorAvailability }) => {
  const [selectedDay, setSelectedDay] = useState({ week });
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (doctorAvailability) {
      setAvailability(doctorAvailability);
    }
  }, [doctorAvailability]);

  /* 수정해야 함 */
  useEffect(() => {
    // Availability가 변경되면 선택된 날짜를 설정
    if (availability.length > 0) {
      const selectedDays = {};
      availability.forEach((item) => {
        selectedDays[item.day] = true;
      });
      setSelectedDay(selectedDays);
    }
  }, [availability]);

  // Select 값을 변경했을 때 ==> 시간 변경
  const handleSelectChange = (day, timeType, selectedOption) => {
    console.log("Selected Option:", selectedOption.target.value); // 확인용 로그

    // 새로운 상태를 저장할 객체
    const newAvailability = [...availability];

    // 선택된 날짜에 대한 인덱스 찾기
    const dayIndex = newAvailability.findIndex((item) => item.day === day);

    if (dayIndex !== -1) {
      // 선택된 날짜가 이미 존재하면 해당 값을 업데이트
      newAvailability[dayIndex][timeType] = selectedOption.target.value;
    } else {
      // 선택된 날짜가 존재하지 않으면 새로운 객체 생성 후 배열에 추가
      const newDay = { day, [timeType]: selectedOption.target.value };
      newAvailability.push(newDay);
    }

    setAvailability(newAvailability);
    setSelectedDay((prevSelectedDay) => ({
      ...prevSelectedDay,
      [day]: true, // 선택된 날짜로 토글
    }));
  };

  const handleRadioChange = (day) => {
    // 체크박스 상태를 업데이트합니다.
    setSelectedDay((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));

    // 만약 체크박스가 선택 해제되었다면 해당 날짜의 셀렉트 값을 초기화합니다.
    if (!selectedDay[day]) {
      const newAvailability = availability.filter((item) => item.day !== day);
      setAvailability(newAvailability);

      // 해당 날짜의 선택 상태를 해제합니다.
      setSelectedDay((prevSelectedDay) => ({
        ...prevSelectedDay,
        [day]: false,
      }));
    }

    onRadioChange(day);
  };

  useEffect(() => {
    console.log("해제 : ", selectedDay);

    // 여기서 selectedDay 값을 사용하여 추가적인 동작을 수행할 수 있습니다.
  }, [selectedDay]);

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
            onChange={() => handleRadioChange("월요일")}
            checked={selectedDay.월요일}
          />
          <h4>월요일</h4>
          <Select
            id={`${dayAbbreviations["월요일"]}StartTime`}
            className={
              selectedDay.월요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("월요일").starttime}
            disabled={!selectedDay.월요일}
            onChange={(selectedOption) =>
              handleSelectChange("월요일", "starttime", selectedOption)
            }
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            id={`${dayAbbreviations["월요일"]}EndTime`}
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("월요일").endtime}
            className={
              selectedDay.월요일 ? "select-enabled" : "select-disabled"
            }
            disabled={!selectedDay.월요일}
            onChange={(selectedOption) =>
              handleSelectChange("월요일", "endtime", selectedOption)
            }
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("화요일")}
            checked={selectedDay.화요일}
          />
          <h4>화요일</h4>
          <Select
            id={`${dayAbbreviations["화요일"]}StartTime`}
            className={
              selectedDay.화요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("화요일").starttime}
            disabled={!selectedDay.화요일}
            onChange={(selectedOption) =>
              handleSelectChange("화요일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id={`${dayAbbreviations["화요일"]}EndTime`}
            className={
              selectedDay.화요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("화요일").endtime}
            disabled={!selectedDay.화요일}
            onChange={(selectedOption) =>
              handleSelectChange("화요일", "endtime", selectedOption)
            }
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("수요일")}
            checked={selectedDay.수요일}
          />
          <h4>수요일</h4>
          <Select
            id={`${dayAbbreviations["수요일"]}StartTime`}
            className={
              selectedDay.수요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("수요일").starttime}
            disabled={!selectedDay.수요일}
            onChange={(selectedOption) =>
              handleSelectChange("수요일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id="wednesdayEndTime"
            className={
              selectedDay.수요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("수요일").endtime}
            disabled={!selectedDay.수요일}
            onChange={(selectedOption) =>
              handleSelectChange("수요일", "endtime", selectedOption)
            }
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("목요일")}
            checked={selectedDay.목요일}
          />
          <h4>목요일</h4>
          <Select
            id={`${dayAbbreviations["목요일"]}StartTime`}
            className={
              selectedDay.목요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("목요일").starttime}
            disabled={!selectedDay.목요일}
            onChange={(selectedOption) =>
              handleSelectChange("목요일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id={`${dayAbbreviations["목요일"]}EndTime`}
            className={
              selectedDay.목요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("목요일").endtime}
            disabled={!selectedDay.목요일}
            onChange={(selectedOption) =>
              handleSelectChange("화요일", "endtime", selectedOption)
            }
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("금요일")}
            checked={selectedDay.금요일}
          />
          <h4>금요일</h4>
          <Select
            id={`${dayAbbreviations["금요일"]}StartTime`}
            className={
              selectedDay.금요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("금요일").starttime}
            disabled={!selectedDay.금요일}
            onChange={(selectedOption) =>
              handleSelectChange("금요일", "starttime", selectedOption)
            }
          />
        </td>
        <h3>~</h3>
        <td>
          <Select
            id={`${dayAbbreviations["금요일"]}EndTime`}
            className={
              selectedDay.금요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("금요일").endtime}
            disabled={!selectedDay.금요일}
            onChange={(selectedOption) =>
              handleSelectChange("금요일", "starttime", selectedOption)
            }
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("토요일")}
            checked={selectedDay.토요일}
          />
          <h4>토요일</h4>
          <Select
            id={`${dayAbbreviations["토요일"]}StartTime`}
            className={
              selectedDay.토요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("토요일").starttime}
            disabled={!selectedDay.토요일}
            onChange={(selectedOption) =>
              handleSelectChange("토요일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id={`${dayAbbreviations["토요일"]}EndTime`}
            className={
              selectedDay.토요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("토요일").endtime}
            disabled={!selectedDay.토요일}
            onChange={(selectedOption) =>
              handleSelectChange("토요일", "endtime", selectedOption)
            }
          />
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("일요일")}
            checked={selectedDay.일요일}
          />
          <h4>일요일</h4>
          <Select
            id={`${dayAbbreviations["일요일"]}StartTime`}
            className={
              selectedDay.일요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("일요일").starttime}
            disabled={!selectedDay.일요일}
            onChange={(selectedOption) =>
              handleSelectChange("일요일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id={`${dayAbbreviations["일요일"]}EndTime`}
            className={
              selectedDay.일요일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("일요일").endtime}
            disabled={!selectedDay.일요일}
            onChange={(selectedOption) =>
              handleSelectChange("일요일", "endtime", selectedOption)
            }
          />
        </td>
        <td>
          <input
            type="checkbox"
            style={{ width: "15px" }}
            onChange={() => handleRadioChange("공휴일")}
            checked={selectedDay.공휴일}
          />
          <h4>공휴일</h4>
          <Select
            id={`${dayAbbreviations["공휴일"]}StartTime`}
            className={
              selectedDay.공휴일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("공휴일").starttime}
            disabled={!selectedDay.공휴일}
            onChange={(selectedOption) =>
              handleSelectChange("공휴일", "starttime", selectedOption)
            }
          />
        </td>
        ~
        <td>
          <Select
            id={`${dayAbbreviations["공휴일"]}EndTime`}
            className={
              selectedDay.공휴일 ? "select-enabled" : "select-disabled"
            }
            options={time}
            style={{ width: "100px" }}
            value={getAvailabilityForDay("공휴일").endtime}
            disabled={!selectedDay.공휴일}
            onChange={(selectedOption) =>
              handleSelectChange("공휴일", "endtime", selectedOption)
            }
          />
        </td>
      </tr>
    </table>
  );
};
export default WorkTime;
