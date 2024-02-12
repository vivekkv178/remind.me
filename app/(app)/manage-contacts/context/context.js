"use client";
import { createContext, useContext } from "react";
import useContactsState from "../hooks/useContactsState";

const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const contactsState = useContactsState();
  return (
    <ContactsContext.Provider value={{ contactsState }}>
      {children}
    </ContactsContext.Provider>
  );
};

const useContactsContext = () => {
  return useContext(ContactsContext);
};

export { ContactsProvider, useContactsContext };
