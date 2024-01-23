import React from "react";
import GenerateButtons from "../Button/GenerateButtons";
import SearchBar from "../SearchBar";
import Button from "../Button";
import { useModalContext } from "../../Context/ModalContext";
import InquiryModal from "../../ModalComponent/InquiryModal";
import { useState } from "react";
import Pagination from "./Pagination";

const CurrentList = ({
  headers,
  items,
  selectable = false,
  style,
  searchBarStyle,
  type,
  buttonType,
  buttonName,
  handleSearch,
}) => {
  const { openModal } = useModalContext();
  console.log("CurrentList의 콘솔", items);
  const handleButtonClick = () => {
    console.log("CurrenList 내부의 콘솔 ", buttonName);
    console.log("버튼이 클릭되었습니다");
    if (buttonName === "작성") {
      openModal(<InquiryModal />, "1:1문의");
    }
  };

  /* 페이징 */
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const pagesVisited = pageNumber * itemsPerPage;
  const displayItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  console.log("CurrentList의 콘솔222", items);
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
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
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
                      <GenerateButtons status={item[key]} />
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headerKey.length + (selectable ? 1 : 0)}>
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
                <SearchBar
                  searchBarStyle={searchBarStyle}
                  handleSearch={handleSearch}
                />
              </div>
            )}
          </div>
        </tfoot>
      </table>
      <Pagination
        pageCount={Math.ceil(items.length / itemsPerPage)}
        onPageChange={changePage}
      />
    </div>
  );
};

export default CurrentList;
