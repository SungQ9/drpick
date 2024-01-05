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

export default ClinicContext;
