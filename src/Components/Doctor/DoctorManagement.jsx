import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../Context/TokenContext';
import axios from 'axios';
import headers from '../SampleData/Headers';
import ListTitle from '../Layout/List/ListTitle';
import List from '../Layout/List';

const DoctorManagement = () => {
  const location = useLocation();
  const selectedType = location.state?.selectedType || 'default';
  const { token, userAuth } = useTokenContext();
  const [title, setTitle] = useState('');
  const [currentHeaders, setCurrentHeaders] = useState();
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      // 의사쪽 userId 이름으로 수정
      memberId: localStorage.getItem('userId'),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedType === 'history') {
          const response = await axios.get(
            // 의사 쪽 조회하는 url로 수정해주세요
            'http://localhost:8080/members/currentHistory',
            config,
          );
          setItems(response.data);
          setCurrentHeaders(headers.medeicalhistory);
          setTitle('진료기록조회');
        } else if (selectedType === 'inquiry') {
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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
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
        />
      )}
    </div>
  );
};

export default DoctorManagement;
