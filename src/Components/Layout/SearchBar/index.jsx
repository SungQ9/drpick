import React, { useState } from 'react';

const SearchBar = ({ type, props = [], searchBarStyle, placeholder }) => {
  const [inputText, setInputText] = useState('');

  const prop1 = props[0];
  const prop2 = props[1];

  const onChangeInput = (evt) => {
    setInputText(evt.target.value);
  };

  const handleSearch = () => {
    if (type === 'Date') console.log('검색버튼클릭 ', prop1, ':', prop2);
    else console.log('검색버튼클릭2', prop1);
  };

  const handleReset = () => {
    setInputText('');
  };

  if (type === 'Date') {
    return (
      <div className='searchBarWrapper'>
        <input
          value={inputText}
          onChange={onChangeInput}
          type='text'
          placeholder={placeholder}
        />
        <button className='clinicSubBtn-short' onClick={handleSearch}>
          검색
        </button>
      </div>
    );
  } else if (type === 'Chat') {
    return (
      <div className='searchBarWrapper'>
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
      </div>
    );
  } else {
    return (
      <div className='searchBarWrapper' style={searchBarStyle}>
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
      </div>
    );
  }
};

export default SearchBar;
