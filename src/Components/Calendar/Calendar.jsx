import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "../Event/EventModal";
import { useEvents } from "../../Context/EventsContext";
import { getAllExpandedEvents } from "../../utils/recurrenceUtils";
import "./Calendar.css";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const { state } = useEvents();
  const monthEvents = getAllExpandedEvents(state.events, currentMonth);

  function openAddModal(date) {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalOpen(true);
  }

  function openEditModal(event) {
    setEditingEvent(event);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  }

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}
        onNext={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        events={monthEvents}
        onDayClick={openAddModal}
        onEventClick={openEditModal} // <-- This is key!
      />
      {modalOpen && (
        <EventModal
          close={closeModal}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
}

export default Calendar;
