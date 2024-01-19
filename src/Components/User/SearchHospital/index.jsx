import React from "react";
import { Routes, Route } from "react-router-dom";
import HospitalList from "./hospitalList";

const SearchHospital = () => {
  return (
    <div className="mainContainer">
      <div className="Form">
        <Routes>
          <Route exact path="/" element={<HospitalList />} />
        </Routes>
      </div>
    </div>
  );
};

export default SearchHospital;
