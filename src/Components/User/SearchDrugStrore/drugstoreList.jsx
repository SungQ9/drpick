import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../Context/TokenContext';
import KakaoDrugstore from './drugstoremap';
import ReactPaginate from 'react-paginate';
import '../../../css/HospitalList.css';
import Loading from '../ImageSearch/Loading';
import DrugstoreSearch from './drugstoreSearch';

const DrugstoreList = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const { token } = useTokenContext();
  const [pageNumber, setPageNumber] = useState(0);
  const listsPerPage = 5; // 페이지 당 보여줄 아이템 수
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작

        // 헤더에 Authorization 추가
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 검색어에 따라 API 호출 URL 구성
        const apiUrl = searchKeyword
          ? `http://localhost:8080/drugstores/getDrugstoreListByKeyword?keyword=${searchKeyword}`
          : 'http://localhost:8080/drugstores/getDrugstoreList';

        const result = await axios.get(apiUrl, config);

        // 데이터 설정
        const newList = result.data;
        setList(newList);
      } catch (error) {
        // 에러 처리
        if (error.response && error.response.status === 401) {
          // navigate("/login");
        }
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [token, navigate, searchKeyword]);

  const pagesVisited = pageNumber * listsPerPage;
  const displayList = list.slice(pagesVisited, pagesVisited + listsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <h2 className='text-center'>약국 검색</h2>
      <div className='drugstoreList'>
        <div className='listForm'>
          <DrugstoreSearch onSearch={handleSearch} />
          <div className='row'>
            {loading && <Loading />}
            <table className='listtable table-striped table-bordered'>
              <tbody>
                {!loading && list && list.length > 0 ? (
                  displayList.map((drugstore) => (
                    <div className='hospital' key={drugstore?.drugstoreId}>
                      <ul>
                        <li
                          style={{
                            listStyleType: 'none',
                            marginBottom: '10px',
                          }}
                        >
                          <h2
                            style={{
                              fontSize: '16px',
                              marginBottom: '2px',
                              fontWeight: 'bold',
                            }}
                          >
                            {drugstore?.drugstoreName || 'N/A'}
                          </h2>
                          <p style={{ fontSize: '13px', color: '#666' }}>
                            {drugstore?.drugstoreAddrMain || 'N/A'}
                          </p>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : !loading ? (
                  <tr>
                    <td colSpan='3'>데이터가 없습니다.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(list.length / listsPerPage)}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
            pageRangeDisplayed={1} // 현재 페이지 좌우에 2개의 페이지를 보여줍니다.
            marginPagesDisplayed={1} // 현재 페이지 앞뒤로 1개의 마진 페이지를 보여줍니다.
          />
        </div>

        <div className='kakaoMap'>
          <KakaoDrugstore list={list} />
        </div>
      </div>
    </>
  );
};

export default DrugstoreList;
