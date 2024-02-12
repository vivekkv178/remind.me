import React from "react";

import { format } from "date-fns";

const Event = ({ event }) => {
  return (
    <a
      className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      href="#"
    >
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="ms-3">
              <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                {event?.event_name}
              </h3>
              <p className="text-sm text-gray-500">
                {event?.name || "General"}
              </p>
              <p className="text-sm text-gray-500">
                {format(event?.event_date?.seconds * 1000 || null, "PPP")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Event;
