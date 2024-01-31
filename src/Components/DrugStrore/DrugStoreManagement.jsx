import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../Context/TokenContext';
import UpdateListContext from '../Context/UpdateListContext';
import axios from 'axios';
import headers from '../SampleData/Headers';
import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';
import Loading from '../User/ImageSearch/Loading';

const DrugStoreManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const { token } = useTokenContext();
  const [title, setTitle] = useState('');
  const [currentHeaders, setCurrentHeaders] = useState();
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

  const fetchDataMappings = {
    history: async () => {
      const response = await axios.get(
        'http://localhost:8080/drugstores/getDrugstoreHistoryList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.drugstoreReceive);
      setTitle('약주문목록');
    },
    inquiry: async () => {
      const response = await axios.get(
        'http://localhost:8080/drugstores/getDrugstoreInquiry',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.drugstoreInquiry);
      setTitle('문의내역');
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchFunction = fetchDataMappings[selectedType];
      if (fetchFunction) {
        await fetchFunction();
      } else {
        console.log('Selected type not found');
      }
    } catch (err) {
      console.error('약국 에러 :', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UpdateListContext.Provider value={fetchData}>
      <div className='listWrapper'>
        <ListTitle title={title} />
        {selectedType === 'history' && (
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
            listType='inquiry'
          />
        )}
      </div>
    </UpdateListContext.Provider>
  );
};

export default DrugStoreManagement;
