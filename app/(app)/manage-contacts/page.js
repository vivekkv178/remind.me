"use client";

import React, { useState } from "react";

import AddContact from "./components/AddContact";
import Settings from "./components/Settings";
import Contact from "./components/Contact";
import EditContact from "./components/EditContact";
import DeleteContact from "./components/DeleteContact";
import { ContactsProvider, useContactsContext } from "./context/context";
import { Loader2 } from "lucide-react";
import DeleteContactEvent from "./components/DeleteContactEvent";

function Contacts() {
  const { contactsState } = useContactsContext();

  return contactsState?.listLoading ? (
    <div className="grid place-items-center">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  ) : (
    <>
      <AddContact />
      <EditContact />
      <DeleteContact />
      <DeleteContactEvent />
      <div className="flex flex-row-reverse">
        <Settings />
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {contactsState?.contacts?.map((contact, index) => (
            <Contact key={index} contact={contact} />
          ))}
        </div>
      </div>
    </>
  );
}

const ManageContacts = () => {
  return (
    <ContactsProvider>
      <Contacts />
    </ContactsProvider>
  );
};

export default ManageContacts;
