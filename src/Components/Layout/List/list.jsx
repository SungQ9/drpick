import React from 'react';

const CurrentList = (
  { headers, items = [] }, // items props 받기, default parameter 빈 배열로 설정
) => {
  const btnHandler = (Status) => {
    if (Status === 'UN')
      return <button className='listBtn-mid'>진료실입장하기</button>;
    else
      return (
        <div>
          <button className='listBtn-short'>진단서</button>
          <button className='listBtn-short' style={{ background: '#AECCC8' }}>
            처방전
          </button>
        </div>
      );
  };

  if (!headers || !headers.length) {
    throw new Error('<List /> headers is required.');
  }
  const headerKey = headers.map((header) => header.value);
  return (
    <div className='listForm'>
      <table className='listTable'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {' '}
              {/* headerKey를 순회하면서 key를 가져옴 */}
              {headerKey.map((key) => (
                <td key={key + index}>
                  {key === 'Status' ? btnHandler(item[key]) : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentList;
