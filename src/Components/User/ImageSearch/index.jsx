import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./SearchForm";
import DrugsPredict from "./Predict";

const ImageSearch = () => {
  return (
    <div className="mainContainer">
      <div className="Form">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/predict" element={<DrugsPredict />} />
        </Routes>
      </div>
    </div>
  );
};

export default ImageSearch;
