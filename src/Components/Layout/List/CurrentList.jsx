import React from 'react';
import Pagination from './Pagination';
import generateButtons from '../../hooks/buttons';
import { handleButtonClick } from '../../hooks/buttonHandler';
import SearchBar from '../SearchBar';
import Button from '../Button';

const CurrentList = (
  {
    headers,
    items = [],
    selectable = false,
    style,
    searchBarStyle,
    type,
    buttonType,
    buttonName,
  }, // items props 받기, default parameter 빈 배열로 설정
) => {
  // 페이지 상태 및 함수 정의
  const [Page, setPage] = React.useState(1);
  const itemsPerPage = 7; // 한 페이지에 보여질 아이템 수

  const indexOfLastItem = Page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber) => setPage(pageNumber);

  if (!headers || !headers.length) {
    throw new Error('<List /> headers is required.');
  }
  const headerKey = headers.map((header) => header.value);

  return (
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
        {items.map((item, index) => (
          <tr key={index}>
            {selectable && (
              <td style={{ width: '30px' }}>
                <input type='checkbox' />
              </td>
            )}
            {/* headerKey를 순회하면서 key를 가져옴 */}
            {headerKey.map((key) => (
              <td key={key + index}>
                {key === 'status'
                  ? generateButtons(item[key], handleButtonClick)
                  : item[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <div className='tfootWrapper'>
          {type === 'Date' && buttonType === 'Y' && (
            <>
              <Button
                buttonName={buttonName}
                buttonType={buttonType}
                handleButtonClick={handleButtonClick}
              />
            </>
          )}

          {type !== 'Date' && type !== 'Lite' && (
            <div className='tfootSearchWrapper'>
              <Button
                buttonName={buttonName}
                buttonType={buttonType}
                handleButtonClick={handleButtonClick}
              />
              <SearchBar searchBarStyle={searchBarStyle} />
            </div>
          )}
          <Pagination />
        </div>
      </tfoot>
    </table>
  );
};

export default CurrentList;
