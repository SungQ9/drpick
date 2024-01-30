// TokenContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  // 상태 초기화
  const [userData, setUserData] = useState(() => {
    try {
      // 로컬 스토리지에서 데이터 불러오기
      const storedToken = localStorage.getItem('accessToken');
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName');
      const storedUserAuth = localStorage.getItem('userAuth');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedRoomName = localStorage.getItem('roomName');
      const storedUserEmail = localStorage.getItem("userEmail")

      // 초기 상태 설정
      // 새로고침시 로컬 스토리지 값과 비교해서 로그아웃 전까지 전역적으로 값 세팅
      return {
        token: storedToken ? JSON.parse(storedToken) : null,
        isLoggedIn: !!storedToken, // 토큰이 존재하면 로그인 상태로 간주
        userId: storedUserId ? storedUserId : null,
        userName: storedUserName ? storedUserName : null,
        userAuth: storedUserAuth ? storedUserAuth : null,
        refreshToken: storedRefreshToken ? storedRefreshToken : null,
        roomName: storedRoomName ? storedRoomName : null,
        userEmail: storedUserEmail ? storedUserEmail : null
      };
    } catch (error) {
      // 에러 발생 시 초기화
      console.error('Error parsing data:', error);
      return {
        token: null,
        isLoggedIn: false,
        userId: null,
        userName: null,
        userAuth: null,
        refreshToken: null,
        roomName: null,
        userEmail: null
      };
    }
  });

  // 로그인시 로컬 스토리지에 저장하면서 같이 넘긴 값  전역적으로 사용 가능하게 지정
  const setAccessToken = ({
    accessToken,
    userId,
    userName,
    userAuth,
    refreshToken,
    userEmail
  }) => {
    // 토큰과 로그인 상태를 로컬 스토리지에 저장
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

    // 이전 상태와 새로운 값들을 병합하여 저장
    setUserData((prevData) => ({
      ...prevData,
      token: accessToken,
      isLoggedIn: true,
      userId,
      userName,
      userAuth,
      refreshToken,
      userEmail
    }));
  };

  const logout = () => {
    // 로그아웃 시 로컬 스토리지 토큰 및 로그인 상태를 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roomName');
    localStorage.removeItem("userEmail")

    // 로그아웃 시 Context 토큰 및 로그인 상태를 삭제
    setUserData({
      token: null,
      isLoggedIn: false,
      userId: null,
      userName: null,
      userAuth: null,
      refreshToken: null,
      roomName: null,
      userEmail:null
    });
  };
  useEffect(() => {
    // 토큰 변경 시 로그인 여부 업데이트
    if (userData.token) {
      // 로그인 상태
      setUserData((prevData) => ({ ...prevData, isLoggedIn: true }));
    } else {
      // 로그아웃 상태
      setUserData((prevData) => ({ ...prevData, isLoggedIn: false }));
    }
  }, [userData.token]);

  return (
    <TokenContext.Provider value={{ ...userData, setAccessToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokenContext Error');
  }
  return context;
};
