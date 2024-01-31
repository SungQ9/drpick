import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import { useModalContext } from '../../Context/ModalContext';
import UpdateListContext from '../../Context/UpdateListContext';
import axios from 'axios';
import headers from '../../SampleData/Headers';
import List from '../../Layout/List';
import ListTitle from '../../Layout/List/ListTitle';
import Loading from '../../User/ImageSearch/Loading';

const AdminManagement = () => {
  const location = useLocation();
  const { token } = useTokenContext();
  const selectedType = location.state?.selectedType || 'default';
  const [title, setTitle] = useState('');
  const [items, setItems] = useState();
  const [currentHeaders, setCurrentHeaders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isModalOpen } = useModalContext();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchDataMappings = {
    user: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getMemberList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.members);
      setTitle('회원관리');
    },
    doctor: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getDoctorsList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.doctors);
      setTitle('의사관리');
    },
    request: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getRegistRequestList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.requestDoctors);
      setTitle('등록요청목록');
    },
    hospital: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getHospitalList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.hospitals);
      setTitle('병원관리');
    },

    drugstore: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getDrugstoreList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.drugstores);
      setTitle('약국관리');
    },

    userInquiry: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getMemberInquiryList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.inquiry);
      setTitle('회원문의');
    },
    doctorInquiry: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getDoctorInquiryList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.inquiry);
      setTitle('의사문의');
    },
    drugstoreInquiry: async () => {
      const response = await axios.get(
        'http://localhost:8080/admin/getDrugstoreInquiryList',
        config,
      );
      setItems(response.data);
      setCurrentHeaders(headers.inquiry);
      setTitle('약국문의');
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
      console.error('데이터 요청 에러:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, token, isModalOpen]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UpdateListContext.Provider value={fetchData}>
      <div className='listWrapper'>
        <ListTitle title={title} />
        {/* 회원 관리 (selectedType === 'user') */}
        {selectedType === 'user' && (
          <List
            headers={currentHeaders}
            items={items}
            listbutton={'수정'}
            listType={'user'}
            buttonType={'N'}
          />
        )}

        {/* 의사 관리 (selectedType === 'doctor') */}
        {selectedType === 'doctor' && (
          <List
            headers={currentHeaders}
            items={items}
            listbutton={'수정'}
            listType={'doctor'}
            buttonType={'N'}
          />
        )}

        {/*의사 등록요청 */}
        {selectedType === 'request' && (
          <List
            headers={currentHeaders}
            items={items}
            listbutton={'상세보기'}
            buttonType={'N'}
            listType={'doctor'}
          />
        )}
        {/*병원관리 */}
        {selectedType === 'hospital' && (
          <List
            headers={currentHeaders}
            items={items}
            buttonType={'Y'}
            buttonName={'추가'}
            listbutton={'수정'}
            listType={'hospital'}
          />
        )}
        {/*약국관리 */}
        {selectedType === 'drugstore' && (
          <List
            headers={currentHeaders}
            items={items}
            buttonType={'Y'}
            buttonName={'추가'}
            listbutton={'수정'}
            listType={'drugstore'}
          />
        )}

        {/*문의관리 */}
        {(selectedType === 'userInquiry' ||
          selectedType === 'doctorInquiry' ||
          selectedType === 'drugstoreInquiry') && (
          <List headers={currentHeaders} items={items} type={'Date'} />
        )}
      </div>
    </UpdateListContext.Provider>
  );
};

export default AdminManagement;
