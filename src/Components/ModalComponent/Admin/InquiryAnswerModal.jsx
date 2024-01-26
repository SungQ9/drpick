// 문의답변 모달
import React from 'react';
import { useModalContext } from '../../Context/ModalContext';
import Input from '../../Layout/Input';
import DoctorRequest from './DoctorRequest';
const InquiryAnswerModal = ({ onClose, PK }) => {
  const { openModal } = useModalContext();

  const handleOpenModal = (component, name, type) => {
    openModal(component, name, type);
  };
  return (
    <div
      style={{
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <table
        id='signUpInputForm'
        className='signUpTable'
        style={{ borderSpacing: '' }}
      >
        <tr>
          <td>
            <Input
              id='inquiry_type'
              className='member_name'
              label='문의유형'
              type='text'
              style={{ width: '245px' }}
              disabled={'disabled'}
            />
          </td>
          <td>
            <Input
              id='inquiry_date'
              className='member_name'
              label='작성일'
              type='text'
              style={{ width: '245px' }}
              disabled={'disabled'}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='hospital_tel'
              className='member_tel'
              label='제목'
              type='text'
              style={{ width: '500px' }}
              disabled={'disabled'}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='hospital_tel'
              className='member_tel'
              label='이름'
              type='text'
              style={{ width: '500px' }}
              disabled={'disabled'}
            />
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                color: '#11c2ad',
                margin: '0px 5px 5px 20px',
                position: 'relative',
                right: '235px',
              }}
            >
              내용
            </h3>
            <p
              style={{
                border: '1px solid #cecece',
                borderRadius: '10px',
                width: '500px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0px',
              }}
            >
              <textarea
                id='comments' // 수정: id 속성 추가
                style={{
                  width: '99%',
                  height: '96%',
                  resize: 'none',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '5px 0px 0px 5px',
                }}
                disabled
              ></textarea>
            </p>
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              right: '140px',
            }}
          >
            <h3
              style={{
                margin: '0px',
                width: '80px',
                color: '#11c2ad',
              }}
            >
              증명파일
            </h3>
            <div
              style={{ marginLeft: '20px', cursor: 'pointer', color: 'blue' }}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(<DoctorRequest />, '증명파일');
              }}
            >
              의사증명서_jpg
            </div>
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                color: '#11c2ad',
                margin: '30px 5px 5px 20px',
                position: 'relative',
                right: '235px',
              }}
            >
              답변
            </h3>
            <p
              style={{
                border: '1px solid #cecece',
                borderRadius: '10px',
                width: '500px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0px',
              }}
            >
              <textarea
                id='comments' // 수정: id 속성 추가
                style={{
                  width: '99%',
                  height: '96%',
                  resize: 'none',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '5px 0px 0px 5px',
                }}
              ></textarea>
            </p>
          </td>
        </tr>
      </table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '25px',
          marginTop: '25px',
          width: '400px',
        }}
      >
        <button className='clinicSubBtn-mid' style={{ background: '#11c2ad' }}>
          확인
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default InquiryAnswerModal;
