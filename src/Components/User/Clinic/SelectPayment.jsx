import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicContext } from '../../Context/ClinicContext';
import back from '../../../img/back-arrow-icon.png';
import card from '../../../img/card-icon.png';
import point from '../../../img/point-icon.png';

const SelectPayment = () => {
  const navigate = useNavigate();
  const clinicContext = useClinicContext();

  // 선택한 결제수단을  context에 저장
  const btnHandler = (evt) => {
    const selectedPayment = evt.currentTarget.getAttribute('data-value');
    clinicContext.selectPayment = selectedPayment;
    console.log(selectedPayment);
    console.log('Clinic Context: ', clinicContext);

    const formData = {
      writeResidentNumber: clinicContext.writeResidentNumber,
      writeSymptom: clinicContext.writeSymptom,
      selectPayment: clinicContext.selectPayment,
      uploadedFiles: clinicContext.uploadedFiles,
    };

    // 여기서 context안에 저장된 값들 불러와서 db로 보내고
    // 성공하면 페이지 이동
    navigate('/clinic/complete');
  };

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
                data-value={'card'}
              >
                <img src={card} alt='card' />
                <h1>카드</h1>
              </td>
              <td
                className='clinicBtn'
                onClick={btnHandler}
                data-value={'point'}
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
