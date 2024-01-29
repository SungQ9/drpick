// 병원 검색 모달
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenContext } from '../../Context/TokenContext';
import { useModalContext } from '../../Context/ModalContext';
import Loading from '../../User/ImageSearch/Loading';

const SearchHospitalModal = ({ onHospitalSelect }) => {
  const [hospitals, setHospitals] = useState([]); // 전체 병원 목록
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();
  const { searchKeyword, setSearchKeyword } = useModalContext(); // ModalContext에서 검색 키워드 가져오기
  const { closeModal } = useModalContext();

  // 병원 클릭 핸들러
  const handleHospitalClick = (hospitalName) => {
    if (onHospitalSelect) {
      onHospitalSelect(hospitalName); // 병원 이름을 ProfileEditList로 전달
    }
    closeModal(); // 모달 닫기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          'http://localhost:8080/hospitals/getHospitalList',
          config,
        );
        setHospitals(response.data);
      } catch (error) {
        // 오류 처리 로직
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // 검색 키워드에 따라 병원 데이터를 필터링
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div
      style={{
        width: '650px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className='hospital-list'
        style={{
          width: '600px',
          height: '300px',
          background: '#DAF6EE',
          borderRadius: '15px',
          margin: '10px',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            bottom: '25px',
          }}
        >
          {filteredHospitals.slice(0, 10).map((hospital) => (
            <li
              key={hospital.id}
              onClick={() => handleHospitalClick(hospital.hospitalName)}
              style={{
                cursor: 'pointer',
                width: '400px',
                height: '20px',
                marginTop: '10px',
              }}
            >
              {hospital.hospitalName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHospitalModal;
