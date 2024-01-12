import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, Page, paginate }) => {
  // 페이지 번호를 담을 배열 생성
  const pageNumbers = [];

  // 총 페이지 수를 계산하여 pageNumbers 배열에 추가
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Pagination UI 렌더링
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          // 페이지 번호에 따라 활성화 여부를 설정하여 스타일을 조절
          <li
            key={number}
            className={number === Page ? 'page-item active' : 'page-item'}
          >
            {/* 페이지 번호 클릭 시 해당 페이지로 이동하는 이벤트 핸들러 등록 */}
            <a onClick={() => paginate(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
