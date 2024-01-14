import React from 'react';
import { useNavigate } from 'react-router-dom';

const StatusSubTable = (props) => {
  const navigate = useNavigate();
  const { title, data } = props;

  return (
    <table className='dashBoardStatusSubTable'>
      <thead>
        <tr>
          <th>{title}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatusSubTable;
