import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import axios from 'axios';
import headers from '../../SampleData/Headers';
import ListTitle from '../../Layout/List/ListTitle';
import List from '../../Layout/List';
import Loading from '../../User/ImageSearch/Loading';

const InquiryManage = () => {
  const location = useLocation();
  const { token, userAuth } = useTokenContext();
  const selectedType = location.state?.selectedType || 'default';
  const [title, setTitle] = useState('');
  const [items, setItems] = useState();
  const [currentHeaders, setCurrentHeaders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberId: localStorage.getItem('userId'),
    },
  };

  const fetchInquiryData = async (apiEndpoint, headers, titleKey) => {
    setIsLoading(true);

    try {
      const response = await axios.get(apiEndpoint, config);
      setItems(response.data);
      setCurrentHeaders(headers);
      setTitle(titleKey);
    } catch (err) {
      console.error('데이터 요청 에러:', err);
      // 에러 발생 시 대체 데이터 설정 가능
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (selectedType) {
      case 'user':
        fetchInquiryData(
          'http://localhost:8080/admin/getMemberList',
          headers.members,
          '회원관리',
        );
        break;
      case 'doctor':
        fetchInquiryData(
          'http://localhost:8080/admin/getDoctorsList',
          headers.doctors,
          '의사관리',
        );
        break;
      case 'request':
        fetchInquiryData(
          'http://localhost:8080/admin/getRegistRequestList',
          headers.requestDoctors,
          '등록요청목록',
        );
        break;
      case 'hospital':
        fetchInquiryData(
          'http://localhost:8080/admin/getHospitalList',
          headers.hospitals,
          '병원관리',
        );
        break;
      case 'drugstore':
        fetchInquiryData(
          'http://localhost:8080/admin/getDrugstoreList',
          headers.drugstores,
          '약국관리',
        );
        break;
      case 'userInquiry':
        fetchInquiryData(
          'http://localhost:8080/admin/getMemberInquiryList',
          headers.members,
          '회원 문의',
        );
        break;
      case 'doctorInquiry':
        fetchInquiryData(
          'http://localhost:8080/admin/getDoctorInquiryList',
          headers.doctors,
          '의사 문의',
        );
        break;
      case 'drugstoreInquiry':
        fetchInquiryData(
          'http://localhost:8080/members/currentHistory',
          headers.members,
          '약국 문의',
        );
        break;
      default:
        setIsLoading(false);
        break;
    }
  }, [selectedType, token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='listWrapper'>
      <ListTitle title={title} />
      {(selectedType === 'hospital' || selectedType === 'drugstore') && (
        <List headers={currentHeaders} items={items} buttonType={''} />
      )}
      {(selectedType === 'userInquiry' ||
        selectedType === 'doctorInquiry' ||
        selectedType === 'drugstoreInquiry') && (
        <List
          headers={currentHeaders}
          items={items}
          buttonType={''}
          type={'Date'}
        />
      )}
      {selectedType !== 'hospital' &&
        selectedType !== 'drugstore' &&
        selectedType !== 'userInquiry' &&
        selectedType !== 'doctorInquiry' &&
        selectedType !== 'drugstoreInquiry' && (
          <List
            headers={currentHeaders}
            items={items}
            buttonType={'N'}
            searchBarStyle={{ position: 'absolute', top: '0px', left: '100px' }}
          />
        )}
    </div>
  );
};

export default InquiryManage;
