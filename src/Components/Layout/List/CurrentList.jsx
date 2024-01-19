import React, { useState, useEffect } from 'react';
import GenerateButtons from '../Button/GenerateButtons';

import SearchBar from '../SearchBar';
import Button from '../Button';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';

const CurrentList = ({
  headers,
  selectable = false,
  style,
  searchBarStyle,
  type,
  buttonType,
  buttonName,
  handleSearch,
}) => {
  const { token, userAuth } = useTokenContext();
  const [displayItems, setDisplayItems] = useState([]);

  const handleButtonClick = () => {
    console.log('버튼이 클릭되었습니다');
  };

  let url;
  switch (userAuth) {
    // 관리자
    case 'A':
      url = 'http://localhost:8080/members/currentAdminHistory';
      break;
    // 의사
    case 'A':
      url = 'http://localhost:8080/doctors/currentHistory';
      break;
    // 약국
    case 'A':
      url = 'http://localhost:8080/drugstores/currentHistory';
      break;
    // 일반
    default:
      url = 'http://localhost:8080/members/currentHistory';
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 헤더에 Authorization 추가
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            memberId: localStorage.getItem('userId'),
          },
        };

        // API 호출
        const result = await axios.get(url, config);

        // 데이터 설정
        const newList = result.data;
        setDisplayItems(newList);
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.status === 401) {
          // 토큰이 만료되었거나 유효하지 않은 경우, 로그인 페이지로 이동 등의 처리 가능
          console.error('Authorization failed. Redirecting to login page.');
          console.error(error.message);
        } else {
          console.error('Error fetching drugstore list:', error.message);
        }
      }
    };

    fetchData(); // useEffect 내에서 호출
  }, []); // token이 변경될 때마다 실행
  if (!headers || !headers.length) {
    throw new Error('<CurrentList /> headers is required.');
  }

  const headerKey = headers.map((header) => header.value);

  return (
    <div>
      <table
        className={`listTable ${selectable ? 'checklistTable' : ''}`}
        style={style}
      >
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: '30px' }}>
                <input type='checkbox' />
              </th>
            )}
            {headers.map((header) => (
              <th key={header.key}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayItems.map((item, index) => (
            <tr key={index}>
              {selectable && (
                <td style={{ width: '30px' }}>
                  <input type='checkbox' />
                </td>
              )}
              {headerKey.map((key) => (
                <td key={key + index}>
                  {key === 'status' ? (
                    <GenerateButtons status={item[key]} />
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <div className='tfootWrapper'>
            {type === 'Date' && buttonType === 'Y' && (
              <Button
                buttonName={buttonName}
                buttonType={buttonType}
                handleButtonClick={handleButtonClick}
              />
            )}
            {type !== 'Date' && type !== 'Lite' && (
              <div className='tfootSearchWrapper'>
                <Button
                  buttonName={buttonName}
                  buttonType={buttonType}
                  handleButtonClick={handleButtonClick}
                />
                <SearchBar
                  searchBarStyle={searchBarStyle}
                  handleSearch={handleSearch}
                />
              </div>
            )}
          </div>
        </tfoot>
      </table>
    </div>
  );
};

export default CurrentList;
