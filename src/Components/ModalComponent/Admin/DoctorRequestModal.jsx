// 의사 등록요청 상세보기 모달
import React from 'react';
import Input from '../../Layout/Input';
import { useModalContext } from '../../Context/ModalContext';
import DoctorRequest from './DoctorRequest';
const DoctorRequestModal = ({ onClose }) => {
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
      <table id='signUpInputForm' className='signUpTable'>
        <tr>
          <td colSpan={2}>
            <Input
              id='name'
              className='member_name'
              label='이름'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='email'
              className='member_email'
              label='이메일'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='pwd'
              className='member_pwd'
              label='비밀번호'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <Input
              id='tel'
              className='member_tel'
              label='전화번호'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Input
              id='tel'
              className='member_tel'
              label='생년월일'
              type='text'
              style={{ width: '270px' }}
              readOnly={'readOnly'}
            />
          </td>
          <td>
            <input
              type='radio'
              className='sex'
              id='sexM'
              value='M'
              name='sex'
              defaultChecked
              style={{
                verticalAlign: 'middle',
                width: '15px',
                cursor: 'pointer',
              }}
            />
            남자
            <input
              type='radio'
              className='sex'
              id='sexF'
              value='F'
              name='sex'
              style={{
                verticalAlign: 'middle',
                width: '15px',
                cursor: 'pointer',
              }}
            />
            여자
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='tel'
              className='member_addr'
              label='주소'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='tel'
              className='member_addr_detail'
              label='나머지주소'
              type='text'
              style={{ width: '500px' }}
              readOnly={'readOnly'}
            />
          </td>
        </tr>
        <tr>
          <td
            className='uploadFileListTd'
            colSpan={2}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              left: '105px',
            }}
          >
            <div
              id='partnerShip'
              style={{
                width: '40px',
                height: '15px',
                borderRadius: '10px 0px 0px 10px',
                fontSize: '11px',
              }}
            >
              증명파일
            </div>
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
      </table>
      <div className='modify-button' style={{ margin: '20px 0px 20px 0px' }}>
        <button className='clinicSubBtn-mid' style={{ background: '#11C2AD' }}>
          수락
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default DoctorRequestModal;
