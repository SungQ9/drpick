import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import useAlert from '../../Layout/Alert';
import back from '../../../img/back-arrow-icon.png';
import card from '../../../img/card-icon.png';
import point from '../../../img/point-icon.png';

const SelectPayment = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();
  const { token } = useTokenContext();
  const { Question, Alert } = useAlert();

  const selectDoctor = clinicContext.clinicState.selectDoctor;
  const selectSubject = clinicContext.clinicState.selectSubject;
  const selectDate = clinicContext.clinicState.selectDate;
  const writeSymptom = clinicContext.clinicState.writeSymptom;

  const btnHandler = async (evt) => {
    // 선택한 결제수단을  context에 저장
    const selectedPayment = evt.currentTarget.getAttribute('data-value');
    clinicContext.setClinicState((prev) => ({
      ...prev,
      selectPayment: selectedPayment,
    }));

    let paymentMethod;
    if (selectedPayment === 'CARD') {
      paymentMethod = '카드';
    } else if (selectedPayment === 'POINT') {
      paymentMethod = '포인트';
    }

    // Alert로 결제 정보 확인
    const confirmation = await Question(
      '해당 정보로 접수하시겠습니까?',
      `의사명 :${selectDoctor} <br>
        진료과목: ${selectSubject} <br>
        진료날짜: ${selectDate} <br>
        결제방법: ${paymentMethod} <br>
        증상: ${writeSymptom} `,
      'question',
    );

    if (confirmation === '확인') {
      // 사용자가 확인을 누르면 접수 진행
      clinicContext.setClinicState((prev) => ({
        ...prev,
        isPaymentSelected: true,
      }));
      console.log('Clinic Context: ', clinicContext);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (clinicContext.clinicState.isPaymentSelected === true) {
      let formData = new FormData();
      formData.append('memberId', clinicContext.clinicState.memberId);

      formData.append('doctorId', clinicContext.clinicState.selectDoctorId);

      formData.append(
        'patientComments',
        clinicContext.clinicState.writeSymptom,
      );

      formData.append(
        'reservationPayment',
        clinicContext.clinicState.selectPayment.toUpperCase(),
      );

      formData.append(
        'reservationStatus',
        clinicContext.clinicState.acceptStatus,
      );

      formData.append('reservationDate', clinicContext.clinicState.selectDate);

      if (clinicContext.clinicState.uploadedFiles.length > 0) {
        clinicContext.clinicState.uploadedFiles.forEach((file) => {
          formData.append('fileList', file);
        });
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      try {
        axios
          .post(
            'http://localhost:8080/members/registReservation',
            formData,
            config,
          )
          .then((response) => {
            Alert('접수가 완료되었습니다', response.data, 'success');
            navigate('/clinic/complete');
          });
      } catch (error) {
        Alert('접수를 실패하였습니다', '잠시후에 다시 시도하여주세요', 'error');
        console.error('진료신청에러', error);
      } finally {
        clinicContext.setClinicState((prev) => ({
          ...prev,
          selectPayment: '',
          isPaymentSelected: false,
          uploadedFiles: [],
        }));
      }
    }
  }, [clinicContext.clinicState, navigate]);

  return (
    <div className='clinicWrapper'>
      <div className='titleWrapper'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1);
          }}
          alt='back'
        />
        <h1 className='stepTitle'>결제수단선택</h1>
      </div>
      <div className='tableWrapper'>
        <table className='clinicTable'>
          <tbody>
            <tr>
              <td
                className='clinicBtn'
                onClick={btnHandler}
                data-value={'CARD'}
              >
                <img src={card} alt='CARD' />
                <h1>카드</h1>
              </td>
              <td
                className='clinicBtn'
                onClick={btnHandler}
                data-value={'POINT'}
              >
                <img src={point} alt='point' />
                <h1>포인트</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectPayment;
