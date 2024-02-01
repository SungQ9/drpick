/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from 'axios'
import { useTokenContext } from '../../Context/TokenContext'
import { useModalContext } from '../../Context/ModalContext'
import ImgModal from '../../ModalComponent/User/ImgModal'
import Video from '../../User/Clinic/ApplicationForm/ClinicRoom/VideoChat/index'
import PatientDetailModal from '../../ModalComponent/Doctor/PatientDetailModal'

const PatientList = ({ type, datas }) => {
  const { openModal } = useModalContext()

  const { token } = useTokenContext()

  const handleBtnClick = async (type, data) => {
    let url = ''
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {},
    }

    // eslint-disable-next-line default-case
    switch (type) {
      case 'detail': // 환자상세
        url = 'http://localhost:8080/doctors/getPatientDetail'
        config.params.memberId = data.memberId

        try {
          const response = await axios.get(url, config)
          openModal(<PatientDetailModal item={response.data} />, '환자상세')
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'reservation-accept': // 진료접수
        url = 'http://localhost:8080/doctors/registCertificate'
        config.params.reservationNum = data.reservationNum

        try {
          const res = await axios.get(url, config)
          alert(res.data.body.message)

          
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'reservation-cancle': // 대기접수취소
        url = ''
        // params = {}
        try {
          const response = await axios.get(url, config)
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'request': // 입장 요청
        url = ''
        // params = {}
        try {
          const response = await axios.get(url, config)
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'start': // 진료시작
        openModal(<Video item={data} />)

        break

      case 'cancle': // 진료취소
        url = ''
        // params = {}
        try {
          const response = await axios.get(url, config)
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'certificate': // 진단서
        url = ''
        // params = {}
        try {
          const response = await axios.get(url, config)
          openModal(<ImgModal item={response.data} />, '진단서')
        } catch (error) {
          console.error('Error:', error)
        }
        break

      case 'prescription': // 처방전
        url = ''
        // params = {}
        try {
          const response = await axios.get(url, config)
          openModal(<ImgModal item={response.data} />, '처방전')
        } catch (error) {
          console.error('Error:', error)
        }
        break

      // 기타 필요한 케이스 추가
    }
  }
  return (
    <ul
      className='patientList'
      style={{
        width: '100%',
        position: 'relative',
        listStyle: 'none',
        marginRight: '40px',
      }}
    >
      {/* 반복문 시작지점 */}
      {datas && Array.isArray(datas) ? (
        datas.length > 0 ? (
          datas.slice(0, 10).map((data, index) => (
            <li
              key={data.reservationNum}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '60px',
                borderBottom: index === 9 ? 'none' : '1px solid #cecece',
              }}
            >
              <div
                className='patientList-left'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '170px',
                }}
              >
                <div
                  className='patientList-top'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    <a
                      onClick={() => {
                        handleBtnClick('detail', data)
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {data.memberName}
                    </a>{' '}
                    {/* 환자 이름 */}
                  </h3>
                  <p style={{ margin: '0px 5px 0px 5px' }}>
                    {data.reservationDate}
                  </p>
                  {/* 접수상태 ex)예약,일반*/}
                  {data.reservationStatus === 'R' && (
                    <span
                      style={{
                        marginLeft: '5px',
                        borderRadius: '7px',
                        background: '#11C2AD',
                        color: '#FFFFFF',
                        width: '50px',
                        height: '25px',
                      }}
                    >
                      예약
                    </span>
                  )}
                </div>
                <div className='patientList-bottom' style={{ marginTop: 0 }}>
                  <span>
                    {' '}
                    {data.patientComments && data.patientComments.length > 8
                      ? data.patientComments.substring(0, 8) + '...'
                      : data.patientComments}
                  </span>{' '}
                </div>
              </div>
              {type === 'wait' && (
                <div className='patientList-right'>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px' }}
                    onClick={() => {
                      handleBtnClick('reservation-accept',data)
                    }}
                  >
                    접수
                  </button>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('reservation-cancle', data)
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
              {type === 'list' && (
                <div className='patientList-right'>
                  {data.certificateStatus === 'Y' ? (
                    <button
                      className='listBtn-short'
                      style={{ width: '65px' }}
                      onClick={() => {
                        handleBtnClick('start')
                      }}
                    >
                      진료시작
                    </button>
                  ) : (
                    <button
                      className='listBtn-short'
                      style={{ width: '65px' }}
                      onClick={() => {
                        handleBtnClick('request')
                      }}
                    >
                      입장요청
                    </button>
                  )}
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('cancel')
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
              {type === 'end' && (
                <div className='patientList-right'>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px' }}
                    onClick={() => {
                      handleBtnClick('certificate', data)
                    }}
                  >
                    진단서
                  </button>
                  <button
                    className='listBtn-short'
                    style={{ width: '65px', background: '#AECCC8' }}
                    onClick={() => {
                      handleBtnClick('prescription', data)
                    }}
                  >
                    처방전
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>조회된 내용이 없습니다.</li>
        )
      ) : (
        <li>Loading...</li>
      )}
    </ul>
  )
}

export default PatientList
