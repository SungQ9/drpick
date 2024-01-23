import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../Context/TokenContext';
import axios from 'axios';
import headers from '../SampleData/Headers';
import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';
import Pagination from '../Layout/List/Pagination';

const DoctorManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const { token, userAuth } = useTokenContext();
  const [title, setTitle] = useState('');
  const [currentHeaders, setCurrentHeaders] = useState();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7; 

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      doctorId: localStorage.getItem('userId'),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedType === 'history') {
          const response = await axios.get(
            'http://localhost:8080/doctors/getDoctorCurrentHistory',
            config,
          );
          setItems(response.data);
          setCurrentHeaders(headers.doctorhistory);
          setTitle('진료기록조회');
        } else if (selectedType === 'inquiry') {
          const response = await axios.get(
            'http://localhost:8080/doctors/getDoctorInquiry',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                doctorId: localStorage.getItem('userId'),
              },
            },
          );
          setItems(response.data);
          setCurrentHeaders(headers.inquiry);
          setTitle('문의내역');
        }
      } catch (err) {
        console.error('사용자 목록 에러 :', err);
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedType, token]);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      {selectedType === 'history' && (
        <>
          <List
            headers={currentHeaders}
            items={itemsToDisplay}
            type='Date'
            buttonType={''}
          />
          <Pagination
            pageCount={Math.ceil(items.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {selectedType === 'inquiry' && (
        <>
          <List
            headers={currentHeaders}
            items={itemsToDisplay}
            type='Date'
            buttonType='Y'
            buttonName='작성'
          />
          <Pagination
            pageCount={Math.ceil(items.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default DoctorManagement;
