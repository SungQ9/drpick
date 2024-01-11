import React from 'react';
import Pagination from './Pagination';
import generateButtons from './Button/buttons';
import { handleButtonClick } from './Button/buttonHandler';
const CurrentList = (
  { headers, items = [], selectable = false }, // items props 받기, default parameter 빈 배열로 설정
) => {
  // 페이지 상태 및 함수 정의
  const [Page, setPage] = React.useState(1);
  const itemsPerPage = 7; // 한 페이지에 보여질 아이템 수

  const medicalHistoryData = [
    // ... (진료내역 데이터)
  ];

  const indexOfLastItem = Page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicalHistoryData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setPage(pageNumber);

  if (!headers || !headers.length) {
    throw new Error('<List /> headers is required.');
  }
  const headerKey = headers.map((header) => header.value);

  return (
    <div className='listForm'>
      <table className='listTable'>
        <thead>
          <tr>
            {selectable && (
              <th>
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
                <td>
                  <input type='checkbox' />
                </td>
              )}
              {/* headerKey를 순회하면서 key를 가져옴 */}
              {headerKey.map((key) => (
                <td key={key + index}>
                  {key === 'status' ? generateButtons(item[key]) : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <Pagination />
      </table>
    </div>
  );
};

export default CurrentList;
