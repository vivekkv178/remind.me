import React from "react";
import { Plus, PlusCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";
import { Button } from "@/components/UI/Button";
import { useContactsContext } from "../context/context";

const events = [
  {
    event_name: "Birthday",
    event_type: "birthday",
  },
  {
    event_name: "Wedding Anniversary",
    event_type: "wedding",
  },
  {
    event_name: "Custom",
    event_type: "custom",
    disabled: true,
  },
];

const AddContactEvent = () => {
  const { contactsState } = useContactsContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Add Event</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Add Event</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {events.map((event, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() =>
                contactsState?.addEventHandler(
                  event.event_name,
                  event.event_type
                )
              }
              disabled={event?.disabled}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>{event.event_name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddContactEvent;
