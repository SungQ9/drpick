import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../../img/back-arrow-icon.png';

const ListTitle = ({ title }) => {
  const navigate = useNavigate();
  const listTitle = title;

  return (
    <div className='listTitle'>
      <img
        className='backIcon'
        src={back}
        onClick={() => {
          navigate(-1);
        }}
        alt='back'
      />
      <h2>{listTitle}</h2>
    </div>
  );
};
export default ListTitle;
