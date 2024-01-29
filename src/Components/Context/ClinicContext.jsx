import { createContext, useContext, useState } from 'react';

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

const ClinicProvider = ({ children }) => {
  // 상태 초기화
  const [clinicState, setClinicState] = useState({
    memberId: '',
    selectDoctorId: '',
    acceptStatus: '',
    selectDate: '',
    selectTime: '',
    writeResidentNumber: '',
    writeSymptom: '',
    selectPayment: '',
    uploadedFiles: [],
    isPaymentSelected: false,
  });

  // Context value
  const contextValue = {
    clinicState,
    setClinicState,
  };

  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
};

export default ClinicProvider;
