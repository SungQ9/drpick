// Modal.js
import React from 'react';

const Modal = ({ isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>
          &times;
        </span>
        <p>모달 내용...</p>
      </div>
    </div>
  );
};

export default Modal;
