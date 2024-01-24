import React, { createContext, useState, useContext } from 'react';
import Modal from '../Layout/Modal/Modal';

// 모달 관리를 위한 Context 생성
const ModalContext = createContext();

// 모달 관리를 위한 Provider 컴포넌트
const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalName, setModalName] = useState('');
  const [type, setType] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태 추가

  const openModal = (component, name, type) => {
    setModalContent(component);
    setModalName(name);
    setIsModalOpen(true);
    setType(type);
    setSearchKeyword(''); // 모달을 열 때마다 검색 키워드 초기화
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchKeyword(''); // 모달을 닫을 때 검색 키워드 초기화
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        searchKeyword, // 검색 키워드 상태와 함수 제공
        setSearchKeyword,
      }}
    >
      {children}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          Name={modalName}
          type={type}
        >
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
