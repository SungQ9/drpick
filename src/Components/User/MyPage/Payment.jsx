// 결제수단등록
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';
import card from '../../../img/card-icon.png';
import { useModalContext } from '../../Context/ModalContext';
import TossBillingModal from '../../ModalComponent/User/TossBillingModal';
import { useTokenContext } from '../../Context/TokenContext';
import useAlert from '../../Layout/Alert';

const Payment = () => {
  const navigate = useNavigate();
  const modalContext = useModalContext();
  const { token, userAuth } = useTokenContext();
  const [isCardRegistered, setIsCardRegistered] = useState(false);
  const [cardDisplayNum, setCardDisplayNum] = useState('카드 등록');
  const { Alert } = useAlert();

  // 발급사 코드 => 발급사명 연결
  const codeToNameMap = {
    '3K': '기업비씨',
    46: '광주',
    71: '롯데',
    30: '산업',
    31: 'BC',
    51: '삼성',
    38: '새마을',
    41: '신한',
    62: '신협',
    36: '씨티',
    33: '우리카드',
    W1: '우리카드',
    37: '우체국예금보험',
    39: '저축은행중앙회',
    35: '전북',
    42: '제주',
    15: '카카오뱅크',
    '3A': '케이뱅크',
    24: '토스뱅크',
    21: '하나',
    61: '현대',
    11: 'KB국민카드',
    91: 'NH농협카드',
    34: 'Sh수협은행',
  };

  useEffect(() => {
    //카드 등록 여부 확인 및 카드 화면에 배치
    const fetchPaymentData = async () => {
      try {
        // DB에서 카드번호 여부확인/카드번호 조회
        const response = await axios.get(
          'http://localhost:8080/payments/getUserPaymentMethodAmount',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              memberId: localStorage.getItem('userId'),
            },
          },
        );

        console.log(response.data);

        // 카드 등록 여부 확인
        if (response.data.memberCreditNum && response.data.cardType) {
          setIsCardRegistered(true);
          const creditNum = response.data.memberCreditNum;
          const segmentedCreditNum = creditNum.match(/.{1,4}/g).join('-');
          const cardIssuer = codeToNameMap[response.data.issuerCode] || '기타';
          setCardDisplayNum(
            response.data.cardType +
              '카드<br />' +
              cardIssuer +
              '<br/>' +
              segmentedCreditNum,
          );
        } else {
          setIsCardRegistered(false);
        }
      } catch (error) {
        console.error('마이페이지 에러:', error);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      }
    };

    fetchPaymentData();
  }, [token]);

  // 토스 자동결제 카드등록 모달 호출
  const openTossBillingModal = () => {
    if (!isCardRegistered) {
      const confirmRegistration = window.confirm('카드를 등록하시겠습니까?');
      if (confirmRegistration) {
        const tossBillingModalContent = <TossBillingModal />;
        modalContext.openModal(tossBillingModalContent, '자동결제');
      }
    }
  };

  // 등록된 카드 삭제
  const deleteRegisteredCard = () => {
    const confirmDeletion = window.confirm('등록된 카드를 삭제하시겠습니까?');
    if (confirmDeletion) {
      axios
        .put('http://localhost:8080/payments/deleteRegisteredCard', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            memberId: localStorage.getItem('userId'),
          },
        })
        .then(() => {
          Alert('삭제성공', '카드가 삭제되었습니다.', 'success');
          window.location.reload();
        })
        .catch((error) => {
          Alert('삭제실패', '카드를 삭제 못하였습니다', 'error');
        });
    }
  };

  return (
    <div className='shortForm'>
      <div id='paymentTitle' style={{ justifyContent: 'unset ' }}>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h2>결제수단등록</h2>
      </div>
      <div className='paymentBody'>
        <h3>신용/체크카드</h3>
        <img src={card} alt='card' />
        <h3>등록된 카드</h3>
        <table id='priceBtnTable'>
          <tr>
            <td
              className='paymentRegisterCard'
              style={{
                height: '100px',
                cursor: isCardRegistered ? 'not-allowed' : 'pointer',
              }}
              onClick={openTossBillingModal}
            >
              <div dangerouslySetInnerHTML={{ __html: cardDisplayNum }} />
            </td>
          </tr>
          {isCardRegistered && (
            <tr>
              <td
                className='deleteRegisteredCard'
                style={{
                  height: '100px',
                }}
                onClick={deleteRegisteredCard}
              >
                카드삭제
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default Payment;
