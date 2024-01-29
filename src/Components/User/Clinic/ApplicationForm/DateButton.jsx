const DateButton = ({ onClick, isSelected, label, setDateValue }) => {
  const handleClick = () => {
    const newDate =
      label === '오늘'
        ? new Date()
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 날짜만 포맷팅
    const formattedDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
    );
    setDateValue(formattedDate);

    console.log(`Selected Button: ${label}`);
    console.log(`Selected Date: ${formattedDate.toISOString().split('T')[0]}`);

    onClick();
  };

  return (
    <button
      style={{
        marginRight: '10px',
        backgroundColor: isSelected ? '#11C2AD' : 'transparent',
        color: isSelected ? '#FFFFFF' : '#727272',
        border: isSelected ? 'none' : '1px solid #cecece',
      }}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default DateButton;
