// TokenContext.js
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const setAccessToken = (accessToken) => {
    setToken(accessToken);
  };

  return (
    <TokenContext.Provider value={{ token, setAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
