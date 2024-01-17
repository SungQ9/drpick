import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../Context/TokenContext";
import axios from "axios";

import "../../css/UserStyle.css";
import "../../css/Style.css";

import mail from "../../img/mail-icon.png";
import key from "../../img/key-icon.png";

const Login = () => {
  // 상태 정의
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const navigate = useNavigate();
  const tokenContext = useTokenContext();

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 API 엔드포인트
    const loginUrl = "http://localhost:8080/users/login";

    try {
      // 로그인 요청
      const response = await axios.post(
        loginUrl,
        {
          userEmail,
          userPwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 로그인 성공 후에 할 작업들...
      console.log("로그인 성공:", response.data);

      // 토큰 콘솔에 출력
      console.log("토큰:", response.data.body.accessToken);
      console.log("리프레시 토큰:", response.data.body.refreshToken);

      // 토큰값, 아이디,이름,역할 로컬스토리지 저장
      if (response.data != null) {
        localStorage.setItem("accessToken", response.data.body.accessToken);
        localStorage.setItem("refreshToken", response.data.body.refreshToken);
        localStorage.setItem("userId", response.data.body.userId);
        localStorage.setItem("userName", response.data.body.userName);
        localStorage.setItem("userAuth", response.data.body.userAuth);
        localStorage.setItem("roomName", response.data.body.userId);

        //  토큰값, 아이디,이름,역할 Context 저장
        const {
          accessToken,
          userId,
          userName,
          userAuth,
          refreshToken,
          roomName,
        } = response.data.body;

        tokenContext.setAccessToken({
          accessToken,
          userId,
          userName,
          userAuth,
          refreshToken,
          roomName,
        });
      }

      navigate("/");
    } catch (error) {
      // 로그인 실패 후에 할 작업들...
      console.error("로그인 실패:", error.message);
    }
  };

  return (
    <div className="mainContainer">
      <div className="loginForm">
        <div className="loginWrapper">
          <h4>
            로그인<span>비대면 진료서비스에 오신것을 환영합니다</span>
          </h4>

          <form
            action=""
            id="loginInputForm"
            className="loginInputForm"
            onSubmit={handleLogin}
          >
            <span>
              <input
                type="text"
                id="email"
                className="loginInput"
                placeholder="아이디 입력"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <label id="inputLabel">
                <img src={mail} alt="Mail Icon" />
              </label>
            </span>

            <span>
              <input
                type="password"
                id="pwd"
                className="loginInput"
                placeholder="비밀번호 입력"
                value={userPwd}
                onChange={(e) => setUserPwd(e.target.value)}
              />
              <label id="inputLabel" style={{ marginBottom: "35px" }}>
                <img src={key} alt="Key Icon" />
              </label>
            </span>

            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
