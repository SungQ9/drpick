// 의사 등록요청 상세보기 모달
import React from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import { useModalContext } from '../../Context/ModalContext';
import Input from '../../Layout/Input';
import DoctorRequest from './DoctorRequest';
import useAlert from '../../Layout/Alert';

const DoctorRequestModal = ({ onClose, item = {}, fetchData }) => {
  const { openModal } = useModalContext();
  const { token } = useTokenContext();
  const showAlert = useAlert();

  const handleOpenModal = (component, name, type) => {
    openModal(component, name, type);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const doctorEmail = item.doctorEmail;
  const acceptDoctorsRequest = () => {
    const apiUrl = 'http://localhost:8080/admin/updateDoctorRegister';

    const data = {
      doctorEmail: doctorEmail,
    };

    axios
      .post(apiUrl, data, config)
      .then((response) => {
        showAlert('Success', '의사 등록이 수락되었습니다.');
        onClose();
        fetchData();
      })
      .catch((error) => {
        showAlert('Error', '수락 중 오류가 발생했습니다.');
        console.error("Error accepting doctor's request:", error);
      });
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
              value={item.doctorName}
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
              value={item.doctorEmail}
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
              value={item.doctorTel}
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
              value={item.doctorBirth}
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
              defaultChecked={item.doctorSex === 'M'}
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
              defaultChecked={item.doctorSex === 'F'}
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
              value={item.doctorAddrMain}
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
              value={item.doctorAddrDetail}
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

                handleOpenModal(
                  <DoctorRequest
                    filePath={
                      'https://storage.googleapis.com/download/storage/v1/b/doctorpick/o/3b937275-eb66-4f0e-bc36-d1b7cc839e28_%ED%8C%8C%EC%9D%B4%EC%96%B4.jpeg?generation=1706774330253983&alt=media'
                    }
                  />,
                  '증명파일',
                );
              }}
            >
              {item.originFileName}
            </div>
          </td>
        </tr>
      </table>
      <div className='modify-button' style={{ margin: '20px 0px 20px 0px' }}>
        <button
          className='clinicSubBtn-mid'
          style={{ background: '#11C2AD' }}
          onClick={acceptDoctorsRequest}
        >
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
