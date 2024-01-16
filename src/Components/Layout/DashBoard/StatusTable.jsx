import React from 'react';

const StatusTable = (props) => {
  const {
    firstLabel,
    firstValue,
    secondLabel,
    secondValue,
    thirdLabel,
    thirdValue,
    fourthLabel,
    fourthValue,
    fifthLabel,
    fifthValue,
    sixthLabel,
    sixthValue,
  } = props;

  return (
    <table className='dashBoardStatusTable'>
      <tr>
        <td>
          <p> {firstLabel}</p> <span>{firstValue}</span>
        </td>
        <td>
          <p> {secondLabel}</p> <span>{secondValue}</span>
        </td>
        <td>
          <p> {thirdLabel} </p>
          <span>{thirdValue}</span>
        </td>
      </tr>
      <tr>
        <td>
          <p> {fourthLabel} </p>
          <span>{fourthValue}</span>
        </td>
        {fifthLabel && fifthValue && (
          <td>
            <p> {fifthLabel} </p>
            <span>{fifthValue}</span>
          </td>
        )}
        {sixthLabel && sixthValue && (
          <td>
            <p> {sixthLabel}</p> <span>{sixthValue}</span>
          </td>
        )}
      </tr>
    </table>
  );
};

export default StatusTable;
