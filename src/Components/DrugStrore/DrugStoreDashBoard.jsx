import React from 'react';
import StatusTable from '../Layout/DashBoard/StatusTable';
import StatusSubTable from '../Layout/DashBoard/StatusSubTable';

const DrugStoreDashBoard = () => {
  const reviewData = [
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
    { date: '2024.01.11', name: '홍길동', description: '신청이 잘 안됩니다' },
  ];
  return (
    <div className='dashBoardWrapper'>
      <div className='dashBoardTop'>
        <StatusTable
          firstLabel={'신규주문'}
          firstValue={`13건`}
          secondLabel={'주문취소'}
          secondValue={`3건`}
          thirdLabel={'수령완료'}
          thirdValue={`11건`}
          fourthLabel={'총주문건'}
          fourthValue={`25건`}
          fifthLabel={'퀵배송'}
          fifthValue={`3건`}
          sixthLabel={'택배배송'}
          sixthValue={`4건`}
        />
        <StatusSubTable title={'문의관리'} data={reviewData} />
      </div>
      <div className='dashBoardBottom'>
        <div className='dashBoardGraph'></div>
      </div>
    </div>
  );
};

export default DrugStoreDashBoard;
