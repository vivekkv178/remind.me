import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { Button } from "@/components/UI/Button";
import { useContactsContext } from "../context/context";
import { constants } from "../utils/constants";
import AddContactEvent from "./AddContactEvent";
import { DatePicker } from "@/components/UI/DatePicker";
import { Loader2 } from "lucide-react";
import { Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";

const EditContact = () => {
  const { contactsState } = useContactsContext();
  return (
    <Dialog
      open={contactsState?.editContact}
      onOpenChange={() =>
        contactsState?.dialogCloseHandler(constants.EDIT_DIALOG)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>You have selected :</DialogDescription>
        </DialogHeader>
        {contactsState?.contactLoading ? (
          <div className="grid place-items-center">
            <Loader2 className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={contactsState?.selectedContact?.name}
                  className="col-span-3"
                  onChange={contactsState?.onChangeHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Phone
                </Label>
                <Input
                  id="username"
                  name="phone"
                  defaultValue={contactsState?.selectedContact?.phone}
                  className="col-span-3"
                  onChange={contactsState?.onChangeHandler}
                />
              </div>
            </div>
            <AddContactEvent />
            {contactsState?.selectedContact?.events?.length
              ? contactsState?.selectedContact?.events?.map((event, index) => (
                  <div className="flex items-center" key={index}>
                    <div className="flex-auto">
                      <Label htmlFor="username" className="text-right">
                        {event?.event_name}
                      </Label>
                    </div>
                    <div className="ml-2">
                      <DatePicker
                        showMonthsOnly
                        formatStr="do LLLL"
                        onDateSelect={(date) =>
                          contactsState?.eventDateSelectHandler(date, event)
                        }
                        date={event?.event_date}
                      />
                    </div>
                    <div>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Trash2
                              color="red"
                              className="ml-2 h-4 w-4"
                              onClick={() =>
                                contactsState?.setDeleteContactEvent(event)
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))
              : null}
          </>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => contactsState?.updateContactHandler()}
          >
            {contactsState?.saveLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
