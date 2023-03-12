import { useState, useEffect, useCallback } from 'react';
import * as MDB from 'mdb-react-ui-kit';

import moment from 'moment';

//month 1-12
const CalendarDays = ({ monthNum = (moment().get('month') + 1) }) => {

  //default value is moment()
  const [dateObject, setDateObject] = useState(moment());
  /*
  const [month, setMonth] = useState({  // 1 - 12
    current: dateObject.format("M"),
    previous: Number(dateObject.format("M")) - 1,
    next: Number(dateObject.format("M")) + 1
  });
  */

  const [month, setMonth] = useState({  // 1 - 12
    current: monthNum,
    previous: Number(monthNum) - 1,
    next: Number(monthNum) + 1
  });

  const isCurrentDay = (day) => {
    return (day == moment().format("D") && month.current == moment().format("M"));
  };
  const setDaysInMonth = useCallback(() => {

    console.log("daysInMonth");
    console.log(month);

    //retrieve the first weekday in a month
    const firstDayOfMonth = moment(dateObject).startOf("month").format("d");
    const lastDayOfMonth = moment(dateObject).endOf("month").format("d");

    const currentMonthDays = dateObject.daysInMonth();
    let previousMonthDays = moment(month.previous, "M").daysInMonth() - firstDayOfMonth + 1;
    let nextMonthDays = 1;

    let rows = [];
    let cells = [];

    let cellCount = Number(firstDayOfMonth) + Number(currentMonthDays) + (6 - lastDayOfMonth);

    for (let i = 0; i < cellCount; i++) {
      //blank area filling before and after the month dates
      /*if (i < firstDayOfMonth || i > currentMonthDays + (firstDayOfMonth - 1)) {
        cells.push(
          <td key={i} className="calendar-day empty bg-secondary">{""}</td>
        );
      }*/
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

    return days;
  }, [month.current]);
  const [days, setDays] = useState(setDaysInMonth());

  const currentMonth = moment().month(month.current - 1).format("MMMM");
  const previousMonth = moment().month(month.previous - 1).format("MMMM");
  const nextMonth = moment().month(month.next - 1).format("MMMM");

  function handleNextMonthClick(event) {
    setMonth((prevState) => ({
      current: prevState.next,
      previous: prevState.current,
      next: Number(prevState.next) + 1
    }));
    setDays(setDaysInMonth());
  };

  function handlePreviousMonthClick(event) {
    setMonth((prevState) => ({
      current: prevState.previous,
      previous: Number(prevState.previous) - 1,
      next: prevState.current
    }));
    setDays(setDaysInMonth());
  };

  /** short week day list from moment, wrap in th tag */
  const weekdayShortName = moment.weekdaysShort().map(day => {
    return (
      <th key={day} className="week-day">
        {day}
      </th>
    );
  });





  return (
    <MDB.MDBContainer>
      previous: {month.previous} current: {month.current} next: {month.next}
      <div className="row " style={{ lineHeight: "normal !important" }}>
        <span className="small col d-flex align-items-center justify-content-end" onClick={handlePreviousMonthClick}>
          {previousMonth}
        </span>
        <span className="h3 m-0 p-2 col">
          {currentMonth}
        </span>
        <span className="small col d-flex align-items-center justify-content-start" onClick={handleNextMonthClick}>
          {nextMonth}
        </span>
      </div>
      <MDB.MDBTable className='table-primary w-75 m-auto'>
        <MDB.MDBTableHead>
          <tr>
            {weekdayShortName}
          </tr>
        </MDB.MDBTableHead>
        <MDB.MDBTableBody>
          {days}
        </MDB.MDBTableBody>
      </MDB.MDBTable>
    </MDB.MDBContainer>
  );

};

export default CalendarDays;
