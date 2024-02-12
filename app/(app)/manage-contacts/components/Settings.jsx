import React from "react";
import { Plus, RefreshCcw, Settings as SettingsIcon } from "lucide-react";

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

const Settings = () => {
  const { contactsState } = useContactsContext();

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
          <DropdownMenuItem onClick={() => contactsState?.setAddContact(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Contact</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={contactsState?.refreshHandler}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            <span>Sync Data</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
