import React, { useState } from 'react';
import { useModalContext } from '../../Context/ModalContext';

const SearchBar = ({ type, props = [], searchBarStyle, placeholder }) => {
  const [inputText, setInputText] = useState('');
  const { setSearchKeyword } = useModalContext(); // ModalContext에서 검색 키워드 가져오기
  const prop1 = props[0];
  const prop2 = props[1];
  const [key, setKey] = useState('');

  const onChangeInput = (evt) => {
    setInputText(evt.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword(inputText);
  };

  const handleClick = (evt) => {
    setKey();
  };
  // const handleSearch = () => {
  //   if (type === 'Date') console.log('검색버튼클릭 ', prop1, ':', prop2);
  //   else console.log('검색버튼클릭2', prop1);
  // };

  const handleReset = () => {
    setInputText('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // 폼 제출 시 페이지 리프레시 방지
    handleSearch();
  };

  if (type === 'Date') {
    return (
      <form onSubmit={handleSubmit} className='searchBarWrapper'>
        <input
          value={inputText}
          onChange={onChangeInput}
          type='text'
          placeholder={placeholder}
        />
        <button className='clinicSubBtn-short' onClick={handleSearch}>
          검색
        </button>
      </form>
    );
  } else if (type === 'Chat') {
    return (
      <form onSubmit={handleSubmit} className='searchBarWrapper'>
        <input
          style={{ width: '370px', height: '50px' }}
          value={inputText}
          onChange={onChangeInput}
          type='text'
          placeholder={placeholder}
        />
        <button
          className='clinicSubBtn-short'
          onClick={handleSearch}
          style={{ width: '120px', height: '50px' }}
        >
          입력
        </button>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className='searchBarWrapper'
        style={searchBarStyle}
      >
        <input value={inputText} onChange={onChangeInput} type='text' />
        <button className='listBtn-short' onClick={handleSearch}>
          검색
        </button>
        <button
          className='listBtn-short'
          onClick={handleReset}
          style={{ background: '#aeccc8' }}
        >
          {' '}
          초기화
        </button>
      </form>
    );
  }
};

export default SearchBar;
