import React from "react";
import "./EventItem.css";

function EventItem({ event, onEventClick }) {
  return (
    <div
      className="event-item"
      style={{ backgroundColor: event.color || "#1976d2" }}
      onClick={e => {
        e.stopPropagation();
        if (onEventClick) onEventClick(event); // Pass the event object!
      }}
      title={event.title}
    >
      <span className="event-title">{event.title}</span>
      {event.recurrence && event.recurrence.type !== "none" && (
        <span className="event-recur" title="Recurring">🔁</span>
      )}
    </div>
  );
}

export default EventItem;
