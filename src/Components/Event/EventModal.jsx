import React from "react";
import EventForm from "./EventForm";
import "./EventModal.css";

function EventModal({ close, selectedDate, editingEvent }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <EventForm
          close={close}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      </div>
    </div>
  );
}

export default EventModal;
