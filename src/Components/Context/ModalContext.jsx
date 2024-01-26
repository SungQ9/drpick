import React, { createContext, useState, useContext } from 'react';
import Modal from '../Layout/Modal/Modal';

// 모달 관리를 위한 Context 생성
const ModalContext = createContext();

// 모달 관리를 위한 Provider 컴포넌트
const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]); // 모달 배열로 관리
  const [modalName, setModalName] = useState('');
  const [type, setType] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태 추가

  const openModal = (component, name, type) => {
    setModals((prevModals) => [...prevModals, { component, name, type }]);
    setModalName(name);
    setType(type);
    setSearchKeyword(''); // 모달을 열 때마다 검색 키워드 초기화
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals.slice(0, prevModals.length - 1));
    setSearchKeyword(''); // 모달을 닫을 때 검색 키워드 초기화
  };

  // 현재 활성화된 모달 정보
  const currentModal = modals[modals.length - 1] || {};

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, searchKeyword, setSearchKeyword }}
    >
      {children}
      {modals.map((modal, index) => (
        <Modal
          key={index}
          isOpen={true}
          onClose={closeModal}
          Name={modal.name}
          type={modal.type}
        >
          {modal.component}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};
// Context를 사용하기 위한 커스텀 훅
const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
