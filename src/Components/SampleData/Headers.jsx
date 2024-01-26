const inquiry = [
  {
    text: '문의유형',
    value: 'inquiryType',
  },
  {
    text: '제목',
    value: 'inquiryTitle',
  },
  {
    text: '문의작성일',
    value: 'inquiryRegdate',
  },
  {
    text: '이메일',
    value: 'inquiryWriterEmail',
  },
  {
    text: '상태',
    value: 'status',
  },
];

const drugstoreInquiry = [
  {
    text: '문의유형',
    value: 'inquiryType',
  },
  {
    text: '제목',
    value: 'inquiryTitle',
  },
  {
    text: '문의작성일',
    value: 'inquiryRegdate',
  },
  {
    text: '이름',
    value: 'drugstoreName',
  },
  {
    text: '상태',
    value: 'status',
  },
];

const medeicalhistory = [
  {
    text: '진료일',
    value: 'certificateDate',
  },
  {
    text: '병원이름',
    value: 'hospitalName',
  },
  {
    text: '의사이름',
    value: 'doctorName',
  },
  {
    text: '결제수단',
    value: 'transactionType',
  },
  {
    text: '상태',
    value: 'status',
  },
];

const medeicalhistoryMypage = [
  {
    text: '진료일',
    value: 'certificateDate',
  },
  {
    text: '병원이름',
    value: 'hospitalName',
  },
  {
    text: '의사이름',
    value: 'doctorName',
  },
  {
    text: '결제수단',
    value: 'transactionType',
  },
];

const doctorhistory = [
  {
    text: '이름',
    value: 'memberName',
  },
  {
    text: '연락처',
    value: 'memberTel',
  },
  {
    text: '생년월일',
    value: 'memberBirth',
  },
  {
    text: '진료일',
    value: 'reservationDate',
  },
  {
    text: '상세보기',
    value: 'status',
  },
];

const doctors = [
  {
    text: '이름',
    value: 'doctorName',
  },
  {
    text: '소속 병원',
    value: 'hospitalName',
  },
  {
    text: '진료 과목',
    value: 'doctorSubject',
  },
  {
    text: '전공',
    value: 'doctorMajor',
  },
];

const members = [
  {
    text: '아이디',
    value: 'memberEmail',
  },
  {
    text: '이름',
    value: 'memberName',
  },
  {
    text: '연락처',
    value: 'memberTel',
  },
  {
    text: '생년월일',
    value: 'memberBirth',
  },
];

const requestDoctors = [
  {
    text: '아이디',
    value: 'doctorEmail',
  },
  {
    text: '이름',
    value: 'doctorName',
  },
  {
    text: '연락처',
    value: 'doctorTel',
  },
  {
    text: '생년월일',
    value: 'doctorBirth',
  },
];

const hospitals = [
  {
    text: '병원명',
    value: 'hospitalName',
  },
  {
    text: '주소',
    value: 'hospitalAddrMain',
  },
  {
    text: '제휴 유무',
    value: 'partnershipStatus',
  },
];

const drugstores = [
  {
    text: '약국 이름',
    value: 'drugstoreName',
  },
  {
    text: '주소',
    value: 'drugstoreAddrMain',
  },
  {
    text: '전화 번호',
    value: 'drugstoreTel',
  },
];

const reviews = [
  {
    text: '진료일',
    value: 'certificateDate',
  },
  {
    text: '병원명',
    value: 'hospitalName',
  },
  {
    text: '의사명',
    value: 'doctorName',
  },
  {
    text: '내평점',
    value: 'rating',
  },
  {
    text: '',
    value: 'status',
  },
];

const drugstoreReceive = [
  {
    text: '이름',
    value: 'memberName',
  },
  {
    text: '연락처',
    value: 'memberTel',
  },
  {
    text: '생년월일',
    value: 'memberBirth',
  },
  {
    text: '수령방법',
    value: 'receiveType',
  },
  {
    text: '수령확인',
    value: 'status',
  },
];

// 목록별 헤더 json 방식으로 추가하고  객체배열에 이름 추가
const headers = {
  inquiry,
  drugstoreInquiry,
  medeicalhistory,
  medeicalhistoryMypage,
  members,
  doctors,
  drugstores,
  requestDoctors,
  hospitals,
  reviews,
  drugstoreReceive,
  doctorhistory,
};

export default headers;
