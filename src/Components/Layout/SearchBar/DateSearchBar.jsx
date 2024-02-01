import React, { useState } from 'react';
import { useModalContext } from '../../Context/ModalContext';
const DateSearchBar = ({
  placeholder = '검색어를 입력하세요',
  onSearch,
  startDate,
  endDate,
  searchValue,
}) => {
  const [inputText, setInputText] = useState(searchValue);
  const { setSearchKeyword } = useModalContext();

  const onChangeInput = (evt) => {
    const newSearchValue = evt.target.value;
    setInputText(newSearchValue);
    setSearchKeyword(newSearchValue);
    onSearch(newSearchValue, startDate, endDate);
  };

  const handleSearch = () => {
    onSearch(inputText, startDate, endDate);
    setSearchKeyword(inputText);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className='searchBarWrapper'>
      <input
        value={inputText}
        onChange={onChangeInput}
        type='text'
        placeholder={placeholder}
      />
      <button className='clinicSubBtn-short'>검색</button>
    </form>
  );
};

export default DateSearchBar;
