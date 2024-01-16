import React from 'react';
import StatusTable from '../Layout/DashBoard/StatusTable';
import StatusSubTable from '../Layout/DashBoard/StatusSubTable';

const DoctorDashBoard = () => {
  const reviewData = [
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
  ];

  return (
    <div className='dashBoardWrapper'>
      <div className='dashBoardTop'>
        <StatusTable
          firstLabel={'예약접수'}
          firstValue={`13건`}
          secondLabel={'접수대기'}
          secondValue={`3건`}
          thirdLabel={'진료취소'}
          thirdValue={`2건`}
          fourthLabel={'총접수건'}
          fourthValue={`12건`}
          fifthLabel={'결제건'}
          fifthValue={`12건`}
          sixthLabel={'총결제금액'}
          sixthValue={`430,000원`}
        />
        <StatusSubTable title={'문의관리'} data={reviewData} />
      </div>
      <div className='dashBoardBottom'>
        <div className='dashBoardGraph'></div>
      </div>
    </div>
  );
};

export default DoctorDashBoard;
