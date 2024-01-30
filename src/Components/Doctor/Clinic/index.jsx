import React, {useState, useEffect} from 'react';
import ReceptionWait from './ReceptionWait';
import CertificateList from './CertificateList';
import EndList from './EndList';
import axios from 'axios'
import { useTokenContext } from '../../Context/TokenContext'

const DoctorClinic = () => {
  const { token, userId } = useTokenContext()
  const [wait, setWait] = useState([])
  const [list, setList] = useState([])
  const [end, setEnd] = useState([])

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      doctorId: userId
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/doctors/getDoctorNonFaceToFaceList',
          config,
        )
        setWait(response.data.waitList || [])
        setList(response.data.confirmList || [])
        setEnd(response.data.finishList || [])
      } catch (err) {
        console.error('의사 목록 에러 :', err)
        // 여기서 에러 발생 시 대체 데이터 설정 가능
      }
    }

    fetchData()
  }, [token])

  return (
    <div>
      <h2
        style={{
          textAlign: 'left',
          margin: '10px 0px 30px 50px',
          fontSize: '30px',
          fontWeight: 'bold',
        }}
      >
        비대면 진료
      </h2>
      <div
        style={{
          display: 'flex ',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ReceptionWait data={wait}/>
        <CertificateList data={list}/>
        <EndList data={end}/>
      </div>
    </div>
  );
};

export default DoctorClinic;
