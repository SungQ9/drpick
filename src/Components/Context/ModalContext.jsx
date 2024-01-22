import React, { createContext, useState, useContext } from 'react';
import Modal from '../Layout/Modal/Modal';

// 모달 관리를 위한 Context 생성
const ModalContext = createContext();

// 모달 관리를 위한 Provider 컴포넌트
const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalName, setModalName] = useState('');

  const openModal = (component, name) => {
    console.log('openModal 호출됨');
    console.log(component);
    console.log(name);
    setModalContent(component);
    setModalName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} Name={modalName}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
