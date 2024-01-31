import React, { useContext, useEffect, useState } from 'react';
import GenerateButtons from '../Button/GenerateButtons';
import SearchBar from '../SearchBar';
import Button from '../Button';
import { useModalContext } from '../../Context/ModalContext';
import UpdateListContext from '../../Context/UpdateListContext';
import InquiryModal from '../../ModalComponent/InquiryModal';
import Pagination from './Pagination';
import MemberProfileEditModal from '../../ModalComponent/Admin/MemberProfileEditModal';
import DoctorProfileEditModal from '../../ModalComponent/Admin/DoctorProfileEditModal';
import HospitalEditModal from '../../ModalComponent/Admin/HospitalEditModal';
import DrugstoreEditModal from '../../ModalComponent/Admin/DrugstoreEditModal';
import DoctorRequestModal from '../../ModalComponent/Admin/DoctorRequestModal';

const CurrentList = ({
  headers,
  items: originalItems,
  selectable = false,
  style,
  searchBarStyle,
  type,
  buttonType,
  buttonName,
  listbutton,
  listType,
  handleSearch,
  filteredDateItems,
  onDeleteReviews,
  onReviewSelect,
  selectedReviews,
}) => {
  // filteredDateItems 값이 존재하면 해당 값을 items로 사용, 그렇지 않으면 originalItems 사용
  const items = filteredDateItems ? filteredDateItems : originalItems;
  const fetchData = useContext(UpdateListContext);
  const { openModal } = useModalContext();

  const handleButtonClick = (item, listbutton) => {
    const actionType = listbutton
      ? `${listbutton}-${listType}`
      : `${buttonName}-${listType}`;

    switch (actionType) {
      case '작성-inquiry':
        openModal(
          <InquiryModal item={item} fetchData={fetchData} />,
          '1:1문의',
        );
        break;
      case '수정-user':
        openModal(
          <MemberProfileEditModal item={item} fetchData={fetchData} />,
          '회원정보수정',
        );
        break;
      case '수정-doctor':
        openModal(
          <DoctorProfileEditModal item={item} fetchData={fetchData} />,
          '의사정보수정',
        );
        break;
      case '추가-hospital':
        openModal(
          <HospitalEditModal item={item} fetchData={fetchData} />,
          '병원추가',
        );
        break;
      case '수정-hospital':
        openModal(
          <HospitalEditModal
            item={item}
            type={'modify'}
            fetchData={fetchData}
          />,
          '병원정보수정',
        );
        break;
      case '추가-drugstore':
        openModal(
          <DrugstoreEditModal item={item} fetchData={fetchData} />,
          '약국추가',
        );
        break;
      case '수정-drugstore':
        openModal(
          <DrugstoreEditModal
            item={item}
            type={'modify'}
            fetchData={fetchData}
          />,
          '약국정보수정',
        );
        break;
      case '추가':
        openModal(<InquiryModal item={item} fetchData={fetchData} />, '추가');
        break;
      case '상세보기-doctor':
        openModal(
          <DoctorRequestModal item={item} fetchData={fetchData} />,
          '추가',
        );
        break;
      case '삭제-review':
        console.log('리뷰삭제 실행');
        console.log(selectedReviews);
        onDeleteReviews(selectedReviews);
        break;
      default:
        console.log('알 수 없는 동작');
    }
  };

  /* 페이징 */
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  // 검색 결과가 변경될 때마다 페이지 번호 초기화
  useEffect(() => {
    setPageNumber(0);
  }, [items]);

  const pagesVisited = pageNumber * itemsPerPage;
  const displayItems =
    items && items.length > 0
      ? items.slice(pagesVisited, pagesVisited + itemsPerPage)
      : [];

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
              <th style={{ width: '200px' }}>
                <input type='checkbox' />
              </th>
            )}
            {headers.map((header) => (
              <th key={header.key}>{header.text}</th>
            ))}
            {listbutton && <th></th>}
          </tr>
        </thead>
        <tbody>
          {displayItems && displayItems.length > 0 ? (
            displayItems.map((item, index) => (
              <tr key={index}>
                {selectable && (
                  <td style={{ width: '200px' }}>
                    <input
                      type='checkbox'
                      onClick={() => {
                        console.log(item.reviewId, '클릭');
                        onReviewSelect(item.reviewId);
                      }}
                    />
                  </td>
                )}
                {headerKey.map((key) => (
                  <td key={key + index}>
                    {key === 'status' ? (
                      <GenerateButtons
                        status={item[key]}
                        item={item}
                        fetchData={fetchData}
                      />
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                {listbutton && (
                  <td>
                    <button
                      onClick={() => {
                        handleButtonClick(item, listbutton);
                      }}
                    >
                      {listbutton}
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  headerKey.length + (selectable ? 1 : 0) + (listbutton ? 1 : 0)
                }
              >
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <div className='tfootWrapper'>
            {type === 'Date' && buttonType === 'Y' && (
              <div className='tfootSearchWrapper'>
                <Button
                  buttonName={buttonName}
                  buttonType={buttonType}
                  handleButtonClick={handleButtonClick}
                  className={'date-list'}
                />
              </div>
            )}

            {type !== 'Date' && type !== 'Lite' && (
              <div className='tfootSearchWrapper'>
                <Button
                  buttonName={buttonName}
                  buttonType={buttonType}
                  handleButtonClick={handleButtonClick}
                  className={'current-list'}
                />
                {filteredDateItems ? null : (
                  <SearchBar
                    searchBarStyle={searchBarStyle}
                    onSearch={handleSearch}
                  />
                )}
              </div>
            )}
            <div className='tfootPaginationWrapper'>
              <Pagination
                pageCount={items ? Math.ceil(items.length / itemsPerPage) : 0}
                onPageChange={changePage}
              />
            </div>
          </div>
        </tfoot>
      </table>
    </div>
  );
};

export default CurrentList;
