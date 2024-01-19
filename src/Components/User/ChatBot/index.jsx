import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatbotPage from './ChatbotPage';

const ChatBot = () => {
  return (
    <div className='mainContainer'>
      <div className='Form'>
        <Routes>
          <Route path='/' element={<ChatbotPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ChatBot;
