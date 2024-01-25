import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import headers from '../../SampleData/Headers';
import List from '../../Layout/List';
import ListTitle from '../../Layout/List/ListTitle';

const UserManagement = () => {
  const location = useLocation();
  const { token, userAuth } = useTokenContext();
  const selectedType = location.state?.selectedType || 'default';
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState();
  const [currentHeaders, setCurrentHeaders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (key) => {
    setKeyword(key);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberId: localStorage.getItem('userId'),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        switch (selectedType) {
          case 'history':
            var response = await axios.get(
              'http://localhost:8080/members/currentHistory',
              config,
            );
            setItems(response.data);
            setCurrentHeaders(headers.medeicalhistory);
            setTitle('진료내역조회');
            break;
          case 'inquiry':
            var response = await axios.get(
              'http://localhost:8080/members/currentHistory',
              config,
            );
            setItems(response.data);
            setCurrentHeaders(headers.inquiry);
            setTitle('1:1문의');
            break;
          case 'review':
            var response = await axios.get(
              'http://localhost:8080/members/getMemberReview',
              config,
            );
            setItems(response.data);
            setCurrentHeaders(headers.reviews);
            setTitle('리뷰관리');
            break;
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

      {selectedType === 'review' && (
        <List
          headers={currentHeaders}
          items={items}
          type='Date'
          buttonType='Y'
          buttonName='삭제'
          onSearch={handleSearch}
          selectable={true}
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

      {selectedType !== 'review' && selectedType !== 'inquiry' && (
        <List
          headers={currentHeaders}
          items={items}
          type='Date'
          buttonType={''}
        />
      )}
    </div>
  );
};

export default UserManagement;
