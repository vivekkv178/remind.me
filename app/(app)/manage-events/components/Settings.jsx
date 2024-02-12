import React from "react";
import {
  BellRing,
  Plus,
  RefreshCcw,
  Settings as SettingsIcon,
} from "lucide-react";

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
import { useEventsContext } from "../context/context";

const Settings = () => {
  const { eventsState } = useEventsContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => eventsState?.setAddEvent(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Event</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={eventsState?.refreshHandler}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            <span>Sync Data</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={eventsState?.notficationsHandler}>
            <BellRing className="mr-2 h-4 w-4" />
            <span>Trigger Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
