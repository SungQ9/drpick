import React, { useState } from 'react';
import Select from '../../Layout/Select';
import star from '../../../img/star-icon.png';

// 리뷰작성 모달
const ReivewModal = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const handleTitleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0px 30px 0px',
        }}
      >
        <Select
          id={'review_title'}
          options={[
            { value: 'K', label: '친절하게 알려주셨어요' },
            { value: 'D', label: '꼼꼼하게 진단해주셨어요' },
            { value: 'C', label: '정확하게 처방해주셨어요' },
            { value: '', label: '선택해주세요' },
          ]}
          style={{ width: '380px' }}
          onChange={handleTitleChange}
          value={selectedValue}
        />
        <img
          src={star}
          alt='star'
          style={{
            width: '25px',
            height: '25px',
            marginLeft: '15px',
            marginRight: '2px',
          }}
        />
        <Select
          id={'review_rating'}
          options={[
            { value: '5', label: '5' },
            { value: '4', label: '4' },
            { value: '3', label: '3' },
            { value: '2', label: '2' },
            { value: '1', label: '1' },
          ]}
          style={{ width: '80px' }}
          onChange={handleRatingChange}
          value={selectedRating}
        />
      </div>
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
          placeholder='리뷰를 작성해주세요 (200자 이내)'
        ></textarea>
      </p>
      <div style={{ marginBottom: '25px', marginTop: '25px' }}>
        <button className='clinicSubBtn-mid' style={{ background: '#11c2ad' }}>
          작성완료
        </button>
        <button className='clinicSubBtn-mid' onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ReivewModal;
