import { useState, useEffect, useCallback } from 'react';
import * as MDB from 'mdb-react-ui-kit';

import moment from 'moment';

//month 1-12
const CalendarDays = ({ month = (moment().get('month') + 1), year = moment().get('year') }) => {
  
  const dateObject = moment();

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const monthIndex = {  // 0 - 11
    current: ((Number(month) - 1) % 12 + 12) % 12,
    previous: ((Number(month) - 2) % 12 + 12) % 12,
    next: (Number(month) % 12 + 12) % 12
  };

  /** short week day list from moment, wrap in th tag */
  const weekdayShortName = moment.weekdaysShort().map(day => {
    return (
      <th key={day} className="week-day">
        {day}
      </th>
    );
  });

  function isCurrentDay(day) {
    return (day == moment().format("D") && month == moment().format("M"));
  };
  function getDaysInMonth() {
    dateObject.set("month", monthIndex.current);
    dateObject.set("year", year);
    
    const firstDayOfMonth = dateObject.startOf("month").format("d");
    const lastDayOfMonth = dateObject.endOf("month").format("d");

    const currentMonthDays = monthDays[monthIndex.current];
    let previousMonthDays = monthDays[monthIndex.previous] - firstDayOfMonth + 1;
    let nextMonthDays = 1;

    let rows = [];
    let cells = [];

    let cellCount = Number(firstDayOfMonth) + Number(currentMonthDays) + (6 - lastDayOfMonth);

    for (let i = 0; i < cellCount; i++) {

      //blank area filling before and after the month dates
      if (i < firstDayOfMonth) {
        cells.push(
          <td key={i} className="calendar-day empty bg-secondary">{previousMonthDays}</td>
        );
        previousMonthDays = previousMonthDays + 1;
      }
      else if (i > currentMonthDays + (firstDayOfMonth - 1)) {
        cells.push(
          <td key={i} className="calendar-day empty bg-secondary">{nextMonthDays}</td>
        );
        nextMonthDays = nextMonthDays + 1;
      }
      else {
        //month dates
        let day = i - firstDayOfMonth + 1;
        let currentDay = isCurrentDay(day) ? "today bg-success" : "";
        cells.push(
          <td key={i} className={`calendar-day ${currentDay}`}>
            {day}
          </td>
        );
      }

      if ((i + 1) % 7 == 0) {
        rows.push(cells); // when reach next week we contain all td in last week to rows 
        cells = []; // empty container 
      }

    }

    let days = rows.map((d, i) => {  //warp rows in tr tag
      return <tr key={"r" + i}>{d}</tr>;
    });
    
    let str = `${dateObject.format("MMMM")} first ${firstDayOfMonth} last ${lastDayOfMonth}`;
    str += ` days ${currentMonthDays} prev days ${previousMonthDays}`;
    str += ` days numbers ${cells}`;

    return days;
  };

  return (
    <MDB.MDBTable className='table-primary w-75 m-auto'>
      <MDB.MDBTableHead>
        <tr>
          {weekdayShortName}
        </tr>
      </MDB.MDBTableHead>
      <MDB.MDBTableBody>
        {getDaysInMonth()}
      </MDB.MDBTableBody>
    </MDB.MDBTable>
  );

};

export default CalendarDays;
