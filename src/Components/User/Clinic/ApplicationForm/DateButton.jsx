const DateButton = ({ onClick, isSelected, label, setDateValue }) => {
  const handleClick = () => {
    let newDate = new Date();

    if (label === '내일') {
      newDate.setDate(newDate.getDate() + 1);
    }

    // 날짜만 포맷팅
    const formattedDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
    );
    setDateValue(formattedDate);

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
