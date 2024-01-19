// Loading.js
import React from "react";
import { Background, LoadingText } from "./Styles";
import SpinnerImage from "../../../img/spinner.gif"; // 변경된 부분

export default () => {
  return (
    <Background>
      <LoadingText>데이터를 불러오는 중입니다</LoadingText>
      <img src={SpinnerImage} alt="로딩중" width="10%" />
    </Background>
  );
};
