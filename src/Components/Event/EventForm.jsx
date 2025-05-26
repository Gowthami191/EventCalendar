import React, { useState, useEffect } from "react";
import { useEvents } from "../../Context/EventsContext";
import { format } from "date-fns";
import { uuidv4 } from "../../utils/uuid";
import { detectConflict } from "../../utils/dateUtils";
import "./EventForm.css";

const recurrenceTypes = [
  { value: "none", label: "None" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "custom", label: "Custom" }
];

function EventForm({ close, selectedDate, editingEvent }) {
  const { state, dispatch } = useEvents();

  // Use useEffect to update form when editingEvent changes
  useEffect(() => {
    setTitle(editingEvent?.title || "");
    setDate(
      editingEvent
        ? editingEvent.date.slice(0, 16)
        : format(selectedDate || new Date(), "yyyy-MM-dd'T'HH:mm")
    );
    setDescription(editingEvent?.description || "");
    setColor(editingEvent?.color || "#1976d2");
    setRecurrenceType(editingEvent?.recurrence?.type || "none");
    setInterval(editingEvent?.recurrence?.interval || 1);
    setDaysOfWeek(editingEvent?.recurrence?.daysOfWeek || []);
    setEndDate(editingEvent?.recurrence?.endDate || "");
    setError("");
  }, [editingEvent, selectedDate]);

  const [title, setTitle] = useState(editingEvent?.title || "");
  const [date, setDate] = useState(
    editingEvent
      ? editingEvent.date.slice(0, 16)
      : format(selectedDate || new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [color, setColor] = useState(editingEvent?.color || "#1976d2");
  const [recurrenceType, setRecurrenceType] = useState(
    editingEvent?.recurrence?.type || "none"
  );
  const [interval, setInterval] = useState(
    editingEvent?.recurrence?.interval || 1
  );
  const [daysOfWeek, setDaysOfWeek] = useState(
    editingEvent?.recurrence?.daysOfWeek || []
  );
  const [endDate, setEndDate] = useState(
    editingEvent?.recurrence?.endDate || ""
  );
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!date) {
      setError("Date and time are required");
      return;
    }
    const event = {
      id: editingEvent?.id || uuidv4(),
      title,
      description,
      date,
      color,
      recurrence:
        recurrenceType === "none"
          ? null
          : {
              type: recurrenceType,
              interval: Number(interval),
              daysOfWeek:
                recurrenceType === "weekly" || recurrenceType === "custom"
                  ? daysOfWeek
                  : undefined,
              endDate: endDate || undefined
            }
    };

    // Prevent conflicts except for the event being edited
    if (
      detectConflict(
        event,
        state.events.filter(ev => ev.id !== event.id)
      )
    ) {
      setError("Event conflicts with another event.");
      return;
    }

    if (editingEvent) {
      dispatch({ type: "UPDATE_EVENT", payload: event });
    } else {
      dispatch({ type: "ADD_EVENT", payload: event });
    }
    close();
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch({ type: "DELETE_EVENT", payload: editingEvent.id });
      close();
    }
  }

  function handleDayOfWeekChange(day) {
    setDaysOfWeek(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{editingEvent ? "Edit Event" : "Add Event"}</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Title
        <input
          type="text"
          value={title}
          maxLength={100}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Date & Time
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          maxLength={250}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <label>
        Color
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
      </label>
      <label>
        Recurrence
        <select
          value={recurrenceType}
          onChange={e => setRecurrenceType(e.target.value)}
        >
          {recurrenceTypes.map(rt => (
            <option key={rt.value} value={rt.value}>
              {rt.label}
            </option>
          ))}
        </select>
      </label>
      {recurrenceType !== "none" && (
        <>
          <label>
            Interval
            <input
              type="number"
              min={1}
              value={interval}
              onChange={e => setInterval(e.target.value)}
            />
            <span>
              {recurrenceType === "daily"
                ? "days"
                : recurrenceType === "weekly"
                ? "weeks"
                : recurrenceType === "monthly"
                ? "months"
                : "custom"}
            </span>
          </label>
          {(recurrenceType === "weekly" || recurrenceType === "custom") && (
            <label>
              Days of Week
              <div className="days-of-week">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (d, i) => (
                    <span key={i}>
                      <input
                        type="checkbox"
                        checked={daysOfWeek.includes(i)}
                        onChange={() => handleDayOfWeekChange(i)}
                      />
                      {d}
                    </span>
                  )
                )}
              </div>
            </label>
          )}
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </label>
        </>
      )}
      <div className="form-actions">
        <button type="submit">{editingEvent ? "Update" : "Add"}</button>
        <button type="button" onClick={close}>Cancel</button>
        {editingEvent && (
          <button
            type="button"
            className="danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
