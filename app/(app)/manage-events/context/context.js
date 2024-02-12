"use client";
import { createContext, useContext } from "react";
import useEventsState from "../hooks/useEventsState";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const eventsState = useEventsState();
  return (
    <EventsContext.Provider value={{ eventsState }}>
      {children}
    </EventsContext.Provider>
  );
};

const useEventsContext = () => {
  return useContext(EventsContext);
};

export { EventsProvider, useEventsContext };
