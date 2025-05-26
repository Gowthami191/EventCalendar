import React, { createContext, useContext, useReducer, useEffect } from "react";

const EventsContext = createContext();

const initialState = {
  events: []
};

function eventsReducer(state, action) {
  switch (action.type) {
    case "LOAD_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
      case "UPDATE_EVENT":
  return {
    ...state,
    events: state.events.map(ev =>
      ev.id === action.payload.id ? action.payload : ev
    )
  };

    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter(ev => ev.id !== action.payload)
      };
    default:
      return state;
  }
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      dispatch({ type: "LOAD_EVENTS", payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state.events));
  }, [state.events]);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
