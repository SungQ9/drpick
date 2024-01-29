import React, { useEffect, useState } from "react";
import GenerateButtons from "../Button/GenerateButtons";
import SearchBar from "../SearchBar";
import Button from "../Button";
import { useModalContext } from "../../Context/ModalContext";
import InquiryModal from "../../ModalComponent/InquiryModal";
import Pagination from "./Pagination";

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
  handleSearch,
  filteredDateItems,
}) => {
  // filteredDateItems 값이 존재하면 해당 값을 items로 사용, 그렇지 않으면 originalItems 사용
  const items = filteredDateItems ? filteredDateItems : originalItems;

  const { openModal } = useModalContext();

  const handleButtonClick = (item, listbutton) => {
    if (buttonName === "작성") {
      openModal(<InquiryModal item={item} />, "1:1문의");
    } else if (listbutton === "수정") {
      openModal(<InquiryModal item={item} />, "수정하기");
    } else if (buttonName === "추가") {
      openModal(<InquiryModal item={item} />, "추가");
    }
  };

  /* 페이징 */
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  // useState hooks를 조건에 따라 두 번 호출하지 않도록 수정
  const [searchInput, setSearchInput] = useState(filteredDateItems ? "" : null);
  const [filteredItems, setFilteredItems] = useState(
    filteredDateItems ? items : null
  );

  // 검색어 필터링 함수
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    console.log("검색어 : " + searchValue);

    // 검색어에 따라 필터링된 결과 업데이트
    const newFilteredItems = items.filter((item) =>
      headers.some(
        (header) =>
          item[header.value] &&
          typeof item[header.value] === "string" &&
          item[header.value].includes(searchValue)
      )
    );
    setFilteredItems(newFilteredItems);
  };

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
        className={`listTable ${selectable ? "checklistTable" : ""}`}
        style={style}
      >
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: "30px" }}>
                <input type="checkbox" />
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
                  <td style={{ width: "30px" }}>
                    <input type="checkbox" />
                  </td>
                )}
                {headerKey.map((key) => (
                  <td key={key + index}>
                    {key === "status" ? (
                      <GenerateButtons status={item[key]} item={item} />
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
          <div className="tfootWrapper">
            {type === "Date" && buttonType === "Y" && (
              <Button
                buttonName={buttonName}
                buttonType={buttonType}
                handleButtonClick={handleButtonClick}
              />
            )}

            {type !== "Date" && type !== "Lite" && (
              <div className="tfootSearchWrapper">
                <Button
                  buttonName={buttonName}
                  buttonType={buttonType}
                  handleButtonClick={handleButtonClick}
                />

                {filteredDateItems ? null : (
                  <SearchBar
                    searchBarStyle={searchBarStyle}
                    onSearch={handleSearch}
                  />
                )}
              </div>
            )}
            {type !== "Lite" && (
              <div className="tfootPaginationWrapper">
                <Pagination
                  pageCount={
                    filteredItems
                      ? Math.ceil(filteredItems.length / itemsPerPage)
                      : 0
                  }
                  onPageChange={changePage}
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
