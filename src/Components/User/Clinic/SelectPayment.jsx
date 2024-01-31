import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import back from '../../../img/back-arrow-icon.png';
import card from '../../../img/card-icon.png';
import point from '../../../img/point-icon.png';

const SelectPayment = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();
  const { token, userId } = useTokenContext();
  // 선택한 결제수단을  context에 저장
  const btnHandler = (evt) => {
    const selectedPayment = evt.currentTarget.getAttribute('data-value');
    clinicContext.setClinicState((prev) => ({
      ...prev,
      selectPayment: selectedPayment,
      isPaymentSelected: true,
    }));
    console.log('Clinic Context: ', clinicContext);
  };

  useEffect(() => {
    if (clinicContext.clinicState.isPaymentSelected == true) {
      const formData = {
        memberId: clinicContext.clinicState.memberId,
        doctorId: clinicContext.clinicState.selectDoctorId,
        patientComments: clinicContext.clinicState.writeSymptom,
        reservationPayment:
          clinicContext.clinicState.selectPayment.toUpperCase(),
        fileList: clinicContext.clinicState.uploadedFiles,
        reservationStatus: clinicContext.clinicState.acceptStatus,
        reservationDate: clinicContext.clinicState.selectDate,
      };
      console.log('Form Data: ', formData);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        params: {
          memberId: userId,
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
            console.log(response.data);
            navigate('/clinic/complete');
          });
      } catch (error) {
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
