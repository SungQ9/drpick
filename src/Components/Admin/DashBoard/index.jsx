// 관리자 대시보드
import React from 'react';

const AdminDashBoard = () => {
  return (
    <div className='dashBoardWrapper'>
      <div className='dashBoardTop'>
        <table className='dashBoardStatusTable'>
          <tr>
            <td>
              당일이용자 <span>350명</span>
            </td>
            <td>
              신규이용자 <span>25명</span>
            </td>
            <td>
              접속중인의사 <span>25명</span>
            </td>
          </tr>
          <tr>
            <td>
              답변하지않은문의<span>12건</span>
            </td>
            <td>
              의사등록요청<span>2건</span>
            </td>
            <td>
              당일충전포인트 <span>235,000원</span>
            </td>
          </tr>
        </table>

        <table className='dashBoardStatusSubTable'>
          <thead>
            <tr>
              <th>문의목록</th>
              <th></th>
              <th>더보기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024.01.11</td>
              <td>홍길동</td>
              <td>신청이 잘 안됩니다</td>
            </tr>
            <tr>
              <td>2024.01.11</td>
              <td>홍길동</td>
              <td>신청이 잘 안됩니다</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='dashBoardBottom'>
        <div className='dashBoardGraph'></div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
