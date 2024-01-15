// SymptomTable 컴포넌트 수정
import React from 'react';

const SymptomTable = ({ datas = [], style }) => {
  return (
    <table className='symptomTable'>
      <tbody>
        {datas[0] && (
          <>
            <tr>
              <td style={style}>{datas[0][1]}</td>
              <td style={style}>{datas[0][2]}</td>
              <td style={style}>{datas[0][3]}</td>
            </tr>
            <tr>
              <td style={style}>{datas[0][4]}</td>
              <td style={style}>{datas[0][5]}</td>
              <td style={style}>{datas[0][6]}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default SymptomTable;
