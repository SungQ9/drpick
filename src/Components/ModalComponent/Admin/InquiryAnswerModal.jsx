// 문의답변 모달
import React, { useState } from 'react';
import axios from 'axios';
import { useModalContext } from '../../Context/ModalContext';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';
import Input from '../../Layout/Input';
import DoctorRequest from './DoctorRequest';

const InquiryAnswerModal = ({ onClose, item = {}, fetchData }) => {
  const { openModal } = useModalContext();
  const { token } = useTokenContext();
  const [adminComments, setAdminComments] = useState(item.inquiryAnswer || '');
  const [refreshKey, setRefreshKey] = useState(0);
  const showAlert = useAlert();

  // 관리자인지 확인
  const userAuth = localStorage.getItem('userAuth');
  const isAdmin = userAuth === 'A';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleOpenModal = (component, name, type) => {
    openModal(component, name, type);
  };

  const updateInquiryAdminAnswer = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/updateInquiryAnswer',
        { inquiryId: item.inquiryId, inquiryAnswer: adminComments },
        config,
      );

      const message = response.data.body.message;

      if (response.data.body.success) {
        showAlert('문의답변 등록성공', message, 'success').then((result) => {
          if (result.isConfirmed) {
            onClose();
            fetchData();
          }
        });

        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        showAlert('문의답변 등록에러', message, 'error');

        // alert(message);
        return;
      }
    } catch (err) {
      if (err.response) {
        // 서버 응답이 있을 경우
        if (err.response.data && err.response.data.error) {
          // 서버에서 에러 응답을 보냈을 때
          const details = err.response.data.details;
          const errorMessages = Object.values(details).join('\n');

          showAlert('유효성 검증 오류', `${errorMessages}`, 'error');
        } else {
          // 기타 서버 응답 오류 처리
          const errorMessage =
            err.response.data.body.message || '서버 응답 오류';
          showAlert('문의답변 등록에러', `${errorMessage}`, 'error');
        }
      } else if (err.request) {
        // 서버로의 요청이 실패했을 경우
        console.error('서버에 요청을 보내는 중 오류가 발생했습니다.');
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
        console.error('오류를 설정하는 중에 문제가 발생했습니다.');
      }
    }
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
              value={item.inquiryType}
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
              value={item.inquiryRegdate}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='inquiry_title'
              className='member_tel'
              label='제목'
              type='text'
              style={{ width: '500px' }}
              disabled={'disabled'}
              value={item.inquiryTitle}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='inquiryWriterEmail'
              className='member_tel'
              label='이메일'
              type='text'
              style={{ width: '500px' }}
              disabled={'disabled'}
              value={item.inquiryWriterEmail}
            />
          </td>
        </tr>
        {isAdmin ? (
          <>
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
                    value={item.inquiryComments}
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
                  style={{
                    marginLeft: '20px',
                    cursor: 'pointer',
                    color: 'blue',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(<DoctorRequest filePath={item.filePath} />, '증명파일');
                  }}
                >{item.originFileName}</div>
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
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                  ></textarea>
                </p>
              </td>
            </tr>
          </>
        ) : (
          <>
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
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
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
                    value={item.inquiryComments}
                    readOnly
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
                  style={{
                    marginLeft: '20px',
                    cursor: 'pointer',
                    color: 'blue',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(<DoctorRequest filePath={item.filePath} />, "증명파일");
                  }}
                >{item.originFileName}</div>
              </td>
            </tr>
          </>
        )}
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
        <button
          className='clinicSubBtn-mid'
          onClick={isAdmin ? updateInquiryAdminAnswer : onClose}
          style={{ background: '#11c2ad' }}
        >
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
