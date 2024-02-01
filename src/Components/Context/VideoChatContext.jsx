import React, { createContext, useContext, useState } from 'react';

const VideoChatContext = createContext();

export const useVideoChat = () => useContext(VideoChatContext);

export const VideoChatProvider = ({ children }) => {
  const [videoChatActive, setVideoChatActive] = useState(false);

  return (
    <VideoChatContext.Provider value={{ videoChatActive, setVideoChatActive }}>
      {children}
    </VideoChatContext.Provider>
  );
};
