import React from "react";
import { Routes, Route } from "react-router-dom";
import DrugstoreList from "./drugstoreList";

const SearchDrugStrore = () => {
  return (
    <div className="mainContainer">
      <div className="Form">
        <Routes>
          <Route exact path="/" element={<DrugstoreList />} />
        </Routes>
      </div>
    </div>
  );
};

export default SearchDrugStrore;
