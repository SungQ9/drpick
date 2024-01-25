import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../Context/TokenContext';
import { useModalContext } from '../Context/ModalContext';
import headers from '../SampleData/Headers';
import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';
import axios from 'axios';
import Loading from '../User/ImageSearch/Loading';

const DrugStoreManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const { token, userAuth } = useTokenContext();
  const [currentHeaders, setCurrentHeaders] = useState();
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
  const { isModalOpen } = useModalContext();
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
          setCurrentHeaders(headers.drugstoreReceive);
          setItems(response.data);
          console.log(response.data);
          setTitle('약주문목록');
        } else if (selectedType === 'inquiry') {
          response = await axios.get(
            'http://localhost:8080/drugstores/getDrugstoreInquiry',
            config,
          );
          setItems(response.data);
          setCurrentHeaders(headers.drugstoreInquiry);
          setTitle('문의내역');
        }
      } catch (err) {
        console.error('약국 에러 :', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedType, token, isModalOpen]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    ); // 로딩 표시
  }

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      {selectedType === 'history' && (
        // <List data={defaultData} type='Date' buttonType={''} />
        <List
          headers={currentHeaders}
          items={items}
          type='Date'
          buttonType={''}
        />
      )}
      {selectedType === 'inquiry' && (
        <List
          headers={currentHeaders}
          items={items}
          type='Date'
          buttonType='Y'
          buttonName='작성'
        />
      )}
    </div>
  );
};

export default DrugStoreManagement;
