import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import { Button } from "@/components/UI/Button";
import { useEventsContext } from "../context/context";
import { constants } from "../utils/constants";
import { Loader2 } from "lucide-react";

const DeleteEvent = () => {
  const { eventsState } = useEventsContext();

  return (
    <Dialog
      open={eventsState?.deleteEvent}
      onOpenChange={() =>
        eventsState?.dialogCloseHandler(constants.DELETE_DIALOG)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure, you want to delete
            <span className="ml-1 font-bold text-black">
              {eventsState?.selectedEvent?.event_name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            onClick={() =>
              eventsState?.dialogCloseHandler(constants.DELETE_DIALOG)
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => eventsState?.deleteEventHandler()}
          >
            {eventsState?.deleteLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEvent;
