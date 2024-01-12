// data.js

const headers = [
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

const items = [
  {
    email: 'qwer@naver.com',
    name: '추하림',
    phoneNum: '010-1234-5678',
    birth: '0000.09.03',
    status: 'M',
  },
  {
    email: 'qwer@naver.com',
    name: '박하림',
    phoneNum: '010-1234-5678',
    birth: '0000.09.03',
    status: 'M',
  },
  {
    email: 'qwer@naver.com',
    name: '매하림',
    phoneNum: '010-1234-5678',
    birth: '0000.09.03',
    status: 'M',
  },
  {
    email: 'qwer@naver.com',
    name: '구하림',
    phoneNum: '010-1234-5678',
    birth: '0000.09.03',
    status: 'M',
  },
];

const data = { headers, items };

export default data;
