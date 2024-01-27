import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../../img/back-arrow-icon.png'
import axios from 'axios'
import { useTokenContext } from '../../Context/TokenContext'
import Input from '../../Layout/Input'
import Address from '../../Layout/Address'
import Loading from '../ImageSearch/Loading'

const UserProfileEdit = () => {
  const navigate = useNavigate()
  const { token, userEmail } = useTokenContext()
  const [isLoading, setIsLoading] = useState(true)
  const [address, setAddress] = useState("")
  const [memberId, setMemberId] = useState("")
  const [memberBirth, setMemberBirth] = useState("")
  const [memberName, setMemberName] = useState("")
  const [memberEmail, setMemberEmail] = useState("")
  const [memberTel, setMemberTel] = useState("")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      memberEmail: userEmail
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // 최근진료내역
      const response = await axios.get(
        'http://localhost:8080/members/getMemberInfo',
        config,
      )

      setMemberEmail(response.data.memberEmail)
      setMemberBirth(formatBirthDate(response.data.memberBirth))
      setMemberName(response.data.memberName)
      setMemberTel(response.data.memberTel)
      setMemberId(response.data.memberId)

      setAddress({
        main: response.data.memberAddrMain,
        detail: response.data.memberAddrDetail,
        subdetail: response.data.memberAddrSubdetail
      })

    } catch (error) {
      console.error('마이페이지 에러 :', error)
      if (error.response) {
        // 서버 응답이 있을 경우
        if (error.response.data && error.response.data.error) {
          // 서버에서 에러 응답을 보냈을 때
          const details = error.response.data.details
          const errorMessages = Object.values(details).join('\n')

          alert(`유효성 검증 오류:\n${errorMessages}`)
        } else {
          // 기타 서버 응답 오류 처리
          const errorMessage = error.response.data.body.message || '서버 응답 오류'
          alert(`${errorMessage}`)
        }
      } else if (error.request) {
        // 서버로의 요청이 실패했을 경우
        console.error('서버에 요청을 보내는 중 오류가 발생했습니다.')
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
        console.error('오류를 설정하는 중에 문제가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 날짜 형식 포맷팅
  const formatBirthDate = (rawDate) => {
    const year = rawDate.substring(0, 4)
    const month = rawDate.substring(4, 6)
    const day = rawDate.substring(6, 8)
    return `${year}-${month}-${day}`
  }

  useEffect(()=>{
    fetchData()
  },[])

  if(isLoading){
    return <Loading />
  }

  // 주소
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress)
  }

  // onChange Event
  const handleNameChange = (event) => {
    setMemberName(event.target.value)
  }

  const handleTelChange = (event) =>{
    setMemberTel(event.target.value)
  }

  // Update Submit
  const updateMemberInfo = async ()=>{
    const formData = new FormData()
    const pwd = document.getElementById('pwd').value
    const ckpwd = document.getElementById('ckpwd').value

    if (pwd !== ckpwd) {
      alert('비밀번호가 다릅니다.')
      return
    }

    formData.append("memberId", memberId)
    formData.append("memberName", memberName)
    formData.append("memberBirth", memberBirth)
    formData.append("memberPwd", pwd)
    formData.append("memberTel", memberTel)
    formData.append("memberAddrMain", address.main)
    formData.append("memberAddrDetail", address.detail)
    formData.append("memberAddrSubdetail", address.subdetail)

    try{
      const res = await axios.post("http://localhost:8080/members/updateMemberInfo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // JSON 형태로 데이터 전송을 위해 추가
          },
      })
      const message = res.data.body.message

      if(res.data.body.success){
        alert(message)
        navigate(-1)
      }else{
        alert(message)
        return
      }
      
    }catch(error){
      if (error.response) {
        // 서버 응답이 있을 경우
        if (error.response.data && error.response.data.error) {
          // 서버에서 에러 응답을 보냈을 때
          const details = error.response.data.details
          const errorMessages = Object.values(details).join('\n')

          alert(`유효성 검증 오류:\n${errorMessages}`)
        } else {
          // 기타 서버 응답 오류 처리
          const errorMessage =
            error.response.data.body.message || '서버 응답 오류'
          alert(`${errorMessage}`)
        }
      } else if (error.request) {
        // 서버로의 요청이 실패했을 경우
        console.error('서버에 요청을 보내는 중 오류가 발생했습니다.')
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 오류가 발생했을 경우
        console.error('오류를 설정하는 중에 문제가 발생했습니다.')
      }
    }
  }

  return (
    <div className='listWrapper'>
      <div className='listTitle'>
        <img
          className='backIcon'
          src={back}
          onClick={() => {
            navigate(-1)
          }}
          alt='back'
        />
        <h2>회원정보수정</h2>
      </div>
      <div id='signUpInputForm' className='signUpInputForm'>
        <table id='signUpTable' className='signUpTable'>
          <tr>
            <td colSpan={2}>
              <Input
                id='email'
                className='member_email'
                label='아이디'
                type='text'
                style={{ width: '500px' }}
                disabled='disabled'
                value={memberEmail}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input
                id='birth'
                className='member_birth'
                label='생년월일'
                type='text'
                style={{ width: '500px' }}
                minLength={8}
                maxLength={8}
                disabled='disabled'
                value={memberBirth}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input
                id='name'
                className='member_name'
                label='이름'
                type='text'
                style={{ width: '500px' }}
                value={memberName.trim()}
                onChange={handleNameChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input
                id='tel'
                className='member_tel'
                label='전화번호'
                type='text'
                style={{ width: '500px' }}
                placeholder="　'-' 없이 입력하세요"
                value={memberTel}
                onChange={handleTelChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input
                id='pwd'
                className='member_pwd'
                label='비밀번호'
                type='password'
                style={{ width: '500px' }}
                placeholder='　영어,숫자,특수문자를 포함한 8~20자 '
                minLength={8}
                maxLength={20}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input
                id='ckpwd'
                className='member_ckpwd'
                label='비밀번호확인'
                type='password'
                style={{ width: '500px', fontSize: '12px' }}
                minLength={8}
                maxLength={20}
              />
            </td>
          </tr>
          <tr>
            <Address onAddressSelect={handleAddressSelect} address={address}/>
          </tr>

          <tr>
            <td colSpan={2}>
              <button className='signUpBtn' onClick={updateMemberInfo}>수정</button>
              <button className='signUpBtn' style={{ background: '#AECCC8' }}>취소</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default UserProfileEdit
