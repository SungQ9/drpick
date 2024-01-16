const headers = [
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
const items = [
  {
    inquiryType: '이용문의',
    inquiryTitle: '신청이 안돼요',
    inquiryWriteDate: '2024-01-09',
    writer: '이성규',
    status: 'IN',
  },
  {
    inquiryType: '이용문의',
    inquiryTitle: '신청이 안돼요',
    inquiryWriteDate: '2024-01-08',
    writer: '이성규',
    status: 'IY',
  },
  {
    inquiryType: '이용문의',
    inquiryTitle: '신청이 안돼요',
    inquiryWriteDate: '2024-01-03',
    writer: '이성규',
    status: 'IY',
  },
  {
    inquiryType: '이용문의',
    inquiryTitle: '신청이 안돼요',
    inquiryWriteDate: '2024-01-02',
    writer: '이성규',
    status: 'IY',
  },
];

const data = { headers, items };

export default data;
