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
import { useContactsContext } from "../context/context";
import { constants } from "../utils/constants";
import { Loader2 } from "lucide-react";

const AddContact = () => {
  const { contactsState } = useContactsContext();

  return (
    <Dialog
      open={contactsState?.addContact}
      onOpenChange={() =>
        contactsState?.dialogCloseHandler(constants.ADD_DIALOG)
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogDescription>Add a new contact to your list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Vivek"
              className="col-span-3"
              onChange={contactsState?.onChangeHandler}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Ex: +919126798343"
              className="col-span-3"
              onChange={contactsState?.onChangeHandler}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => contactsState?.addContactHandler()}
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

export default AddContact;
