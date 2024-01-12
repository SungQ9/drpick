const headers = [
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
    text: '리뷰상태',
    value: 'status',
  },
];
const items = [
  {
    clinicDate: '2024-01-09',
    hospitalName: '거구장병원',
    doctorName: '림의사',
    grade: '5.0',
    status: 'RN',
  },
  {
    clinicDate: '2024-01-06',
    hospitalName: '거구장병원',
    doctorName: '백의사',
    grade: '5.0',
    status: 'RY',
  },
  {
    clinicDate: '2024-01-04',
    hospitalName: '거구장병원',
    doctorName: '규의사',
    grade: '5.0',
    status: 'RY',
  },
  {
    clinicDate: '2024-01-03',
    hospitalName: '거구장병원',
    doctorName: '림의사',
    grade: '4.0',
    status: 'RY',
  },
];
const selectable = true;
const data = { headers, items, selectable };

export default data;
