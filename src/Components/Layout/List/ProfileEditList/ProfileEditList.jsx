import React from 'react';
import Select from '../../Select';
import WorkTime from './WorkTime';

const ProfileEditList = ({ type, title }) => {
  if (type === 'doctor') {
    return (
      <div>
        <h2>{title}</h2>
        <div className='profile-top'>
          <div className='profile-top-left'></div>
          <div className='profile-top-right'>
            <table>
              <tr>
                <td colSpan={2}>
                  <input type='text' />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='text' />
                </td>
                <td>
                  <Select
                    options={[
                      { value: '가정의학과', label: '가정의학과' },
                      { value: '내과', label: '내과' },
                      { value: '마취통증과', label: '마취통증과' },
                      { value: '비뇨기과', label: '비뇨기과' },
                      { value: '산부인과', label: '산부인과' },
                      { value: '성형외과', label: '성형외과' },
                      { value: '소아과', label: '소아과' },
                      { value: '피부과', label: '피부과' },
                      { value: '신경외과', label: '신경외과' },
                      { value: '안과', label: '안과' },
                      { value: '영상의학과', label: '영상의학과' },
                      { value: '외과', label: '외과' },
                      { value: '이비인후과', label: '이비인후과' },
                      { value: '치과', label: '치과' },
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type='text' />
                </td>
                <td>
                  <button>병원검색</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className='profile-mid'>
          <div>
            <textarea></textarea>
          </div>
        </div>
        <div className='profile-bottom'>
          <h3>비대면 진료 시간 설정</h3>
          <WorkTime />
        </div>
        <button>저장</button>
        <button>취소</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{title}</h2>
      </div>
    );
  }
};

export default ProfileEditList;
