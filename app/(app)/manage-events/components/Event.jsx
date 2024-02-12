import React from "react";
import { Edit, Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { useEventsContext } from "../context/context";
import { format } from "date-fns";

const Event = ({ event }) => {
  console.log(event);
  const { eventsState } = useEventsContext();

  return (
    <a
      className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      href="#"
    >
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <span class="inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-500 text-sm font-semibold text-white leading-none">
              {event?.name?.charAt(0).toUpperCase()}
            </span> */}
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
          {!event.name && (
            <div className="flex">
              <div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Edit
                        className="mr-2 h-4 w-4"
                        onClick={() => eventsState?.editHandler(event)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash2
                        color="red"
                        className="mr-2 h-4 w-4"
                        onClick={() => eventsState?.deleteHandler(event)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default Event;
