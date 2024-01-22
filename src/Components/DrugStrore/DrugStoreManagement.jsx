import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../Context/TokenContext';
import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';
import data from '../SampleData/medicalhistoryData';
import data2 from '../SampleData/inquiryData';
import axios from 'axios';

const DrugStoreManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const { token, userAuth } = useTokenContext();
  const [defaultData, setDefaultData] = useState();
  const [title, setTitle] = useState('');
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      drugstoreId: localStorage.getItem('userId'),
    },
  };

  const headers = [
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

  useEffect(() => {
    // eslint-disable-next-line default-case
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (selectedType === 'history') {
          response = await axios.get(
            'http://localhost:8080/drugstores/getDrugstoreHistoryList',
            config,
          );

          const items = response.data;
          const data = { headers, items };
          setItems(response.data);
          console.log(response.data);
          setTitle('약주문목록');
        } else if (selectedType === 'inquiry') {
          setDefaultData(data2);
          setTitle('문의내역');
        }
      } catch (err) {
        console.error('약국 에러 :', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedType, token]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 표시
  }

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      {selectedType === 'history' && (
        // <List data={defaultData} type='Date' buttonType={''} />
        <List headers={headers} items={items} type='Date' buttonType={''} />
      )}
      {selectedType === 'inquiry' && (
        <List data={defaultData} type='Date' buttonType='Y' buttonName='작성' />
      )}
    </div>
  );
};

export default DrugStoreManagement;
