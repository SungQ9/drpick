import React, { useEffect } from "react";
import "../../../css/Style.css";
import logo from "../../../img/logo.png";
import userLogo from "../../../img/user-icon.png";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../Context/TokenContext";
import axios from 'axios';

const TopHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, userName, userAuth, token, refreshToken } = useTokenContext();

  const logoutHandler = async () => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          refreshToken: refreshToken
        }
      }

      const result = await axios.delete(
        'http://localhost:8080/users/logout',
         config,
      )
    }catch(error){
      if (error.response) {
        // 서버 응답이 있을 경우
        if (error.response.data && error.response.data.error) {
          // 서버에서 에러 응답을 보냈을 때
          const details = error.response.data.details
          const errorMessages = Object.values(details).join("\n")

          alert(`유효성 검증 오류:\n${errorMessages}`)
        } else {
          // 기타 서버 응답 오류 처리
          const errorMessage = error.response.data.body.message || "서버 응답 오류"
          alert(`${errorMessage}`)
        }
      } else if (error.request) {
        // 서버로의 요청이 실패했을 경우
        console.error("서버에 요청을 보내는 중 오류가 발생했습니다.")
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
        console.error("오류를 설정하는 중에 문제가 발생했습니다.")
      }
    }

    logout();
    navigate("/login");
  };

  const loginBefore = () => {
    return (
      <ul>
        <li
          onClick={() => {
            navigate("/signUp");
          }}
        >
          회원가입
        </li>
        <li
          className="loginLi"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </li>
      </ul>
    );
  };

  const loginAfter = () => {
    return (
      <ul>
        <li>
          <span>{userName} 회원님 어서오세요 </span>
        </li>
        <li>
          <p onClick={logoutHandler}>로그아웃</p>
        </li>
        {userAuth === "N" && (
          <li className="mypageLi" onClick={() => navigate("/user")}>
            마이페이지
            <img src={userLogo} alt="User" />
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="topHeader">
      <div className="logoContainer">
        <img
          src={logo}
          alt="Logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="ul-Wrapper">
        {isLoggedIn ? loginAfter() : loginBefore()}
      </div>
    </div>
  );
};

export default TopHeader;
