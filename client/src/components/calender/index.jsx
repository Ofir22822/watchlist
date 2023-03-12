import { useState, useEffect } from 'react';
import * as MDB from 'mdb-react-ui-kit';
import CalenderDays from './calender-days';
import moment from 'moment';

const Calendar = () => {

  const [month, setMonth] = useState(moment().get('month')+1);
  const [year, setYear] = useState(moment().get('year'));

  const monthNames = moment.months();

  const monthIndex = {  // 0 - 11
    current: ((Number(month) - 1) % 12 + 12) % 12,
    previous: ((Number(month) - 2) % 12 + 12) % 12,
    next: (Number(month) % 12 + 12) % 12
  };

  const currentMonth = monthNames[monthIndex.current];
  const previousMonth = monthNames[monthIndex.previous];
  const nextMonth = monthNames[monthIndex.next];
  
  function handleMonthNextClick(event){
    setMonth(((Number(month) + 1) % 12 + 12) % 12);
    if(month === 0){
      setYear((Number(year) + 1));
    }
  }

  function handleMonthPreviousClick(event){
    setMonth(((Number(month) - 1) % 12 + 12) % 12);
    if(month === 1){
      setYear((Number(year) - 1));
    }
  }
  
  return (
    <MDB.MDBContainer>
      <h2>Calendar</h2>
      <MDB.MDBContainer> 
        <div className="row " style={{ lineHeight: "normal !important" }}>
        <span className="small col d-flex align-items-center justify-content-end" onClick={handleMonthPreviousClick}>
          {previousMonth}
        </span>
        <span className="h3 m-0 p-2 col">
          {currentMonth}
        </span>
        <span className="small col d-flex align-items-center justify-content-start" onClick={handleMonthNextClick}>
          {nextMonth}
        </span>
      </div>
        <CalenderDays month={month} year={year} />
      </MDB.MDBContainer>

    </MDB.MDBContainer>
  );
}

export default Calendar;