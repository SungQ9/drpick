// data.js

const headers = [
  {
    text: '진료일',
    value: 'clinicDate',
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
    value: 'payment',
  },
  {
    text: '상태',
    value: 'status',
  },
];

const items = [
  {
    clinicDate: '2024-01-27',
    hospitalName: '거구장병원',
    doctorName: '림의사',
    payment: '카드',
    status: 'UN',
  },
  {
    clinicDate: '2024-01-27',
    hospitalName: '거구장병원',
    doctorName: '백의사',
    payment: '포인트',
    status: 'UY',
  },
  {
    clinicDate: '2024-01-27',
    hospitalName: '거구장병원',
    doctorName: '규의사',
    payment: '카드',
    status: 'UY',
  },
  {
    clinicDate: '2024-01-27',
    hospitalName: '거구장병원',
    doctorName: '정의사',
    payment: '카드',
    status: 'UY',
  },
];

const data = { headers, items };

export default data;
