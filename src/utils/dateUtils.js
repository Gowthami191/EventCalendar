import { isSameDay, parseISO } from "date-fns";

export function detectConflict(event, events) {
  const eventStart = parseISO(event.date);
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);

  return events.some(ev => {
    const evStart = parseISO(ev.date);
    const evEnd = new Date(evStart.getTime() + 60 * 60 * 1000);
    return (
      isSameDay(eventStart, evStart) &&
      ((eventStart >= evStart && eventStart < evEnd) ||
        (eventEnd > evStart && eventEnd <= evEnd))
    );
  });
}
