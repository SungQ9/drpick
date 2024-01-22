import React, { useState } from 'react';
import Input from '../Input';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

const Adress = ({ onAddressSelect }) => {
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const setAddressDatas = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress = fullAddress.replace(localAddress, '');
      // mainAddress를 localAddress와 fullAddress로 구성된 주소로 설정
      const combinedMainAddress = localAddress + fullAddress;
      setMainAddress(combinedMainAddress);

      // detailAddress를 extraAddress로 설정
      setDetailAddress(extraAddress);

      // 상위 컴포넌트에 주소 데이터 전달
      onAddressSelect({ main: combinedMainAddress, detail: extraAddress });
      console.log(
        '메인주소 :',
        combinedMainAddress,
        '상세주소: ',
        extraAddress,
      );
    }
  };

  const searchAddress = () => {
    open({ onComplete: setAddressDatas });
  };

  return (
    <div>
      <tr>
        <td>
          <Input
            id='addr_main'
            className='member_addr_main'
            type='text'
            label='주소'
            placeholder='주소를 입력해주세요'
            value={mainAddress}
            readOnly
          />
        </td>
        <td>
          <button id='addrBtn' onClick={searchAddress}>
            주소검색
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan={2}>
          <Input
            id='addr_detail'
            className='member_addr_detail'
            type='text'
            label='상세주소'
            style={{ width: '500px' }}
            placeholder='나머지 주소를 입력해주세요'
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </td>
      </tr>
    </div>
  );
};

export default Adress;
