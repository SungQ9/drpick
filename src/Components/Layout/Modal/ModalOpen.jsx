import React, { useState } from 'react';
import Modal from './Modal';

import SignUp from '../../Sign/SignUp';
import Sample from './sample';

const ModalOpen = ({ onClick, componentName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (component) => {
    setIsModalOpen(true);
    setModalContent(component);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log('로그인버튼클릭');
          openModal(<Sample />);
        }}
      >
        로그인 모달
      </button>
      <button
        onClick={() => {
          console.log('회원가입버튼클릭');
          openModal(<Sample />);
        }}
      >
        회원가입 모달
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} Name={'모달테스트'}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default ModalOpen;
