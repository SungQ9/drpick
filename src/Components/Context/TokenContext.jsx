// TokenContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    console.log('Stored Token:', storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  const tokenContextProps = {
    memberId: '',
    memberName: '',
    memeberAuth: '',
  };

  const tokenContextValue = { ...tokenContextProps };

  return (
    <TokenContext.Provider
      value={{ token, setAccessToken, logout, tokenContextValue }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
