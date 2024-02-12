import React, { useState } from "react";
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
import { useEventsContext } from "../context/context";
import { constants } from "../utils/constants";
import { DatePicker } from "@/components/UI/DatePicker";
import { Loader2 } from "lucide-react";

const AddEvent = () => {
  const { eventsState } = useEventsContext();

  return (
    <Dialog
      open={eventsState?.addEvent}
      onOpenChange={() => eventsState?.dialogCloseHandler(constants.ADD_DIALOG)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>Add a new event to your list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="event_name"
              placeholder="Ex: Vivek"
              className="col-span-3"
              onChange={eventsState?.onChangeHandler}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Date
            </Label>
            <DatePicker
              showMonthsOnly
              formatStr="do LLLL"
              onDateSelect={eventsState?.eventDateSelectHandler}
              // date={event?.event_date}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => eventsState?.addEventHandler()}>
            {eventsState?.saveLoading ? (
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

export default AddEvent;
