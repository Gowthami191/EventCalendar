import React from "react";
import { format } from "date-fns";
import EventItem from "../Event/EventItem";
import "./DayCell.css";

function DayCell({
  day,
  events,
  isCurrentMonth,
  isToday,
  onDayClick,
  onEventClick // receives click handler for events
}) {
  return (
    <div
      className={`day-cell ${isCurrentMonth ? "" : "not-current"} ${isToday ? "today" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onDayClick(day); // only trigger day click if background is clicked, not an event
        }
      }}
    >
      <div className="day-number">{format(day, "d")}</div>
      <div className="events-list">
        {events.map((ev) => (
          <EventItem
            key={ev.instanceId || ev.id}
            event={ev}
            onEventClick={() => onEventClick(ev)} // correctly passes the clicked event
          />
        ))}
      </div>
    </div>
  );
}

export default DayCell;
