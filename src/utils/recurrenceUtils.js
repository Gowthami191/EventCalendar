import {
    isSameMonth,
    startOfMonth,
    endOfMonth,
    addDays,
    addMonths,
    getDay,
    parseISO,
    format
  } from "date-fns";
  
  export function getAllExpandedEvents(events, monthDate) {
    const expanded = [];
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
  
    for (const ev of events) {
      if (!ev.recurrence || ev.recurrence.type === "none") {
        if (isSameMonth(parseISO(ev.date), monthDate)) {
          expanded.push(ev);
        }
      } else {
        let current = parseISO(ev.date);
        let count = 0;
        const maxInstances = 60;
  
        while (
          current <= monthEnd &&
          count < maxInstances
        ) {
          if (
            current >= monthStart &&
            current <= monthEnd
          ) {
            if (
              (ev.recurrence.type === "weekly" ||
                ev.recurrence.type === "custom") &&
              ev.recurrence.daysOfWeek &&
              !ev.recurrence.daysOfWeek.includes(getDay(current))
            ) {
              // Skip this day
            } else {
              expanded.push({
                ...ev,
                date: format(current, "yyyy-MM-dd'T'HH:mm"),
                instanceId: ev.id + "-" + format(current, "yyyyMMdd")
              });
            }
          }
          if (ev.recurrence.type === "daily") {
            current = addDays(current, ev.recurrence.interval || 1);
          } else if (ev.recurrence.type === "weekly" || ev.recurrence.type === "custom") {
            current = addDays(current, 1);
          } else if (ev.recurrence.type === "monthly") {
            current = addMonths(current, ev.recurrence.interval || 1);
          }
          if (ev.recurrence.endDate && current > parseISO(ev.recurrence.endDate)) {
            break;
          }
          count++;
        }
      }
    }
    return expanded;
  }
  