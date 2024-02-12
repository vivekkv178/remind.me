"use client";

import React, { useState } from "react";

import AddEvent from "./components/AddEvent";
import Settings from "./components/Settings";
import Event from "./components/Event";
import EditEvent from "./components/EditEvent";
import DeleteEvent from "./components/DeleteEvent";
import { EventsProvider, useEventsContext } from "./context/context";
import { Loader2 } from "lucide-react";

function Events() {
  const { eventsState } = useEventsContext();

  return eventsState?.listLoading ? (
    <div className="grid place-items-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  ) : (
    <>
      <AddEvent />
      <EditEvent />
      <DeleteEvent />
      <div className="flex flex-row-reverse">
        <Settings />
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {eventsState?.events?.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

const ManageEvents = () => {
  return (
    <EventsProvider>
      <Events />
    </EventsProvider>
  );
};

export default ManageEvents;
