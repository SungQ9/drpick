// Loading.js
import React from "react";
import { Background, LoadingText } from "./Styles";
import SpinnerImage from "../../../img/spinner.gif"; // 변경된 부분

export default () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려주세요</LoadingText>
      <img src={SpinnerImage} alt="로딩중" width="10%" />
    </Background>
  );
};
