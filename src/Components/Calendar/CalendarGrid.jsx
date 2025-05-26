import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay
} from "date-fns";
import DayCell from "./DayCell";
import "./CalendarGrid.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarGrid({ currentMonth, events, onDayClick, onEventClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "yyyy-MM-dd");
      const dayEvents = events.filter(ev =>
        ev.date.startsWith(formattedDate)
      );
      days.push(
        <DayCell
          key={day}
          day={day}
          events={dayEvents}
          isCurrentMonth={isSameMonth(day, monthStart)}
          isToday={isSameDay(day, new Date())}
          onDayClick={onDayClick}
          onEventClick={onEventClick} // <-- Passes the handler!
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="calendar-grid">
      <div className="calendar-days-row">
        {daysOfWeek.map(d => (
          <div className="calendar-day-name" key={d}>
            {d}
          </div>
        ))}
      </div>
      {rows}
    </div>
  );
}

export default CalendarGrid;
