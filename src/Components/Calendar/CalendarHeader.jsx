import React from "react";
import { format } from "date-fns";
import "./CalendarHeader.css";

function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>&lt;</button>
      <span className="calendar-header-title">
        {format(currentMonth, "MMMM yyyy")}
      </span>
      <button onClick={onNext}>&gt;</button>
    </div>
  );
}

export default CalendarHeader;
