// 회원정보수정 모달
import React, { useState } from 'react';
import Input from '../../Layout/Input';
import Address from '../../Layout/Address';

const MemberProfileEdit = ({ onClose, item = {} }) => {
  const [selectedName, setSelectedName] = useState('');
  const [address, setAddress] = useState({ main: '', detail: '' });

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
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
              placeholder='이름을 입력하세요'
              style={{ width: '500px' }}
              value={selectedName.trim()}
              onChange={(e) => setSelectedName(e.target.value)}
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
              placeholder='　이메일형식'
              style={{ width: '500px' }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='pwd'
              className='member_pwd'
              label='비밀번호'
              type='password'
              style={{ width: '500px' }}
              placeholder='　영어,숫자,특수문자를 포함한 8~20자 '
              minLength={8}
              maxLength={20}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Input
              id='ckpwd'
              className='member_ckpwd'
              label='비밀번호확인'
              type='password'
              style={{ width: '500px', fontSize: '12px' }}
              minLength={8}
              maxLength={20}
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
              placeholder="　'-' 없이 입력하세요"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Address onAddressSelect={handleAddressSelect} />
          </td>
        </tr>
      </table>
      <div className='modify-button'>
        <button
          className='clinicSubBtn-short'
          style={{ background: 'red', height: '50px' }}
        >
          제한
        </button>
        <button className='clinicSubBtn-mid' style={{ background: '#11C2AD' }}>
          저장
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default MemberProfileEdit;
