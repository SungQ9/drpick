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
    value: 'inquiryWriteDate',
  },
  {
    text: '이름',
    value: 'writer',
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

const members = [
  {
    text: '아이디',
    value: 'email',
  },
  {
    text: '이름',
    value: 'name',
  },
  {
    text: '연락처',
    value: 'phoneNum',
  },
  {
    text: '생년월일',
    value: 'birth',
  },
  {
    text: '',
    value: 'status',
  },
];

const reviews = [
  {
    text: '진료일',
    value: 'clinicDate',
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
    value: 'grade',
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
  medeicalhistory,
  members,
  reviews,
  drugstoreReceive,
  doctorhistory,
};

export default headers;
