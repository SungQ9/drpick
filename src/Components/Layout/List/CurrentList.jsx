import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import generateButtons from "../../hooks/buttons";
import { handleButtonClick } from "../../hooks/buttonHandler";
import SearchBar from "../SearchBar";
import Button from "../Button";

const CurrentList = ({
  headers,
  items = [],
  selectable = false,
  style,
  searchBarStyle,
  type,
  buttonType,
  buttonName,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const pagesVisited = pageNumber * itemsPerPage;
  const displayItems = items.slice(pagesVisited, pagesVisited + itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (!headers || !headers.length) {
    throw new Error("<CurrentList /> headers is required.");
  }

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
          {displayItems.map((item, index) => (
            <tr key={index}>
              {selectable && (
                <td style={{ width: "30px" }}>
                  <input type="checkbox" />
                </td>
              )}
              {headerKey.map((key) => (
                <td key={key + index}>
                  {key === "status"
                    ? generateButtons(item[key], handleButtonClick)
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}
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
                <SearchBar searchBarStyle={searchBarStyle} />
              </div>
            )}
            <Pagination
              pageCount={Math.ceil(items.length / itemsPerPage)}
              onPageChange={changePage}
            />
          </div>
        </tfoot>
      </table>
    </div>
  );
};

export default CurrentList;
