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
import { Loader2 } from "lucide-react";

const DeleteContact = () => {
  const { contactsState } = useContactsContext();

  return (
    <Dialog
      open={contactsState?.deleteContact}
      onOpenChange={() =>
        contactsState?.dialogCloseHandler(constants.DELETE_DIALOG)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogDescription>
            Are you sure, you want to delete
            <span className="ml-1 font-bold text-black">
              {contactsState?.selectedContact?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="secondary"
            onClick={() =>
              contactsState?.dialogCloseHandler(constants.DELETE_DIALOG)
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => contactsState?.deleteContactHandler()}
          >
            {contactsState?.deleteLoading ? (
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

export default DeleteContact;
