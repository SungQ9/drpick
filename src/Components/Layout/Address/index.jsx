import React, { useState, useEffect } from 'react'
import Input from '../Input'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode'

const Address = ({ onAddressSelect, address }) => {
  const [mainAddress, setMainAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [subDetailAddress, setSubDetailAddress] = useState('')

  useEffect(() => {
    setMainAddress(address.main)
    setDetailAddress(address.detail)
    setSubDetailAddress(address.subdetail)
  }, [])

  const open = useDaumPostcodePopup(postcodeScriptUrl)

  const setAddressDatas = (data) => {
    let fullAddress = data.address
    let extraAddress = ''
    let localAddress = data.sido + ' ' + data.sigungu

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }

      fullAddress = fullAddress.replace(localAddress, '')
      // mainAddress를 localAddress와 fullAddress로 구성된 주소로 설정
      const combinedMainAddress = localAddress + fullAddress
      setMainAddress(combinedMainAddress)

      // detailAddress를 extraAddress로 설정
      setDetailAddress(extraAddress)

      setSubDetailAddress("")

      // 상위 컴포넌트에 주소 데이터 전달
      onAddressSelect({
        main: combinedMainAddress,
        detail: extraAddress,
        subdetail: subDetailAddress,
      })
    }
  }

  const searchAddress = () => {
    open({ onComplete: setAddressDatas })
  }

  const handleSubDetailChange = (e) => {
    const newSubDetailAddress = e.target.value;
    setSubDetailAddress(newSubDetailAddress);

    // 상위 컴포넌트에 새로운 subDetailAddress 전달
    onAddressSelect({
      main: mainAddress,
      detail: detailAddress,
      subdetail: newSubDetailAddress,
    });
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
            style={{ width: '240px' }}
            value={detailAddress}
          />
          <input
            id='addr_subdetail'
            className='member_addr_detail'
            type='text'
            label='상세주소'
            style={{
              width: '240px',
              marginLeft: '10px',
              textAlign: 'center',
              textIndent: '0px',
            }}
            placeholder='나머지 주소를 입력해주세요'
            value={subDetailAddress}
            onChange={handleSubDetailChange} 
          />
        </td>
      </tr>
    </div>
  )
}

export default Address