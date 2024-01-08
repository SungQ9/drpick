import { createContext, useContext } from 'react';

const ClinicContext = createContext('Context 테스트');

// 사용할 훅 생성
export const useClinicContext = () => {
  const context = useContext(ClinicContext);

  if (!context) {
    throw new Error(
      'useClinicContext 는 반드시 ClinicProvider랑 같이 사용해야함',
    );
  }
  return context;
};

// Context에 설정한 훅으로 전역적으로 설정한 값들 생성
const clinicContextProps = {
  selectDoctor: '', // 선택한 의사
  acceptStatus: '', // 선택한 접수방법 (일반,예약)
  selectDate: '', // 예약접수시 선택한 날짜
  selectTime: '', // 예약접수시 선택한 시간
  wirteResidentNumber: '', // 작성한 주민등록번호 뒷자리
  writeSymptom: '', // 작성한증상
  selectPayment: '', // 선택한 결제방법
};

const ClinicProvider = ({ children }) => {
  // 새로운 객체를 생성하여 value로 전달
  const contextValue = { ...clinicContextProps };

  // Context.Provider로 라우터 감싸고 value로 지정한 값 전달
  // 이렇게 처리하면 해당 라우터안에 동일한 값 전달 가능
  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
};

export default ClinicProvider;
