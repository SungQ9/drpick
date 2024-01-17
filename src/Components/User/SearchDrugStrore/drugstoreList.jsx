import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';

const DrugstoreList = () => {

    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const {token} = useTokenContext();
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                // 헤더에 Authorization 추가
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
        
                console.log('header :' + config.headers);
        
                // API 호출
                const result = await axios.get(
                  'http://localhost:8080/drugstores/getDrugstoreList',
                  config,
                );
        
                // 데이터 설정
                const newList = result.data;
                console.log(newList);
                setList(newList);
              }catch (error) {
                // 에러 처리
                if (error.response && error.response.status === 401) {
                  // 토큰이 만료되었거나 유효하지 않은 경우, 로그인 페이지로 이동 등의 처리 가능
                  console.error('Authorization failed. Redirecting to login page.');
                  console.error(error.message);
                  navigate('/login');
                } else {
                  console.error('Error fetching drugstore list:', error.message);
                }
              }
        }

        fetchData();
    }, [token, navigate])


    return (
        <div>
          <h2 className='text-center'>약국 리스트</h2>
          <div className='row'>
            <table className='table table-striped table-bordered'>
              <thead className='thead-dark'>
                <tr>
                  <th>약국명</th>
                  <th>주소</th>
                  <th>제휴상태 </th>
                </tr>
              </thead>
              <tbody>
                {list && list.length > 0 ? (
                  list.map((drugstore) => (
                    <tr key={drugstore?.drugstoreId}>
                      <td>{drugstore?.drugstoreName || 'N/A'}</td>
                      <td>{drugstore?.drugstoreAddrMain || 'N/A'}</td>
                      <td>{drugstore?.drugstoreConfirmYn || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default DrugstoreList;