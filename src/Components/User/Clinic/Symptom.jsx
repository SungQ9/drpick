import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Layout/SearchBar/index';
import SymptomTable from './SymptomTable';
import symptom from '../../SampleData/symptomData';
import symptomKey from '../../SampleData/symptomData2';

const Symptom = () => {
  const navigate = useNavigate();
  const data = symptom;
  const data2 = symptomKey;

  return (
    <div className='symptomWrapper'>
      <div className='symptomText'>
        <h2 style={{ paddingRight: '330px' }}>어떻게 아프신가요?</h2>
      </div>
      <div className='symptomTop'>
        <SymptomTable
          datas={data}
          style={{ marginTop: '2%', background: '#11C2AD', color: '#FFFFFF' }}
        />
      </div>
      <SearchBar type={'Date'} placeholder={'병원이름,지역,과목증상'} />
      <div className='symptomBottom'>
        <div className='symptomText'>
          <h3>인기검색어</h3>
        </div>
        <SymptomTable
          datas={data2}
          style={{
            background: '#AECCC8',
            color: '#FFFFFF',
            borderRadius: '40px',
          }}
        />
      </div>
    </div>
  );
};

export default Symptom;
