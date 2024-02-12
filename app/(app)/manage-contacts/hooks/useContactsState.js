import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import {
  addDocument,
  addSubDocument,
  deleteDocument,
  deleteSubDocument,
  getDocument,
  listSubCollection,
  setSubDocument,
  updateDocument,
} from "@/lib/firestore";
import { useEffect, useState } from "react";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";
import { toast } from "@/components/UI/use-toast";

const useContactsState = () => {
  const [contacts, setContacts] = useState([]);
  const [addContact, setAddContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [deleteContact, setDeleteContact] = useState(false);
  const [deleteContactEvent, setDeleteContactEvent] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const authReducerState = useSelector((state) => state.auth);

  const listContactsHandler = async () => {
    setListLoading(true);
    const data = await listSubCollection({
      parentCollectionName: FIRESTORE_COLLECTIONS.USERS,
      parentDocumentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
    });
    setListLoading(false);
    setContacts(data);
  };

  useEffect(() => {
    if (authReducerState?.user) listContactsHandler();
  }, [authReducerState?.user]);

  const onChangeHandler = (event) => {
    const newContactDetails = { ...selectedContact };
    newContactDetails[event.target.name] = event.target.value;
    setSelectedContact(newContactDetails);
  };

  const getEventDetails = async (contact) => {
    if (contact.events) {
      const events = [];
      for (const event of contact.events) {
        const getRes = await getDocument({
          collectionName: FIRESTORE_COLLECTIONS.EVENTS,
          documentId: typeof event === "string" ? event : event?.doc_id,
        });
        events.push(getRes);
      }
      contact.events = events;
    }
    return contact;
  };

  const editHandler = async (contact) => {
    setEditContact(true);
    setContactLoading(true);
    const contactWithEventDetails = await getEventDetails(contact);
    setSelectedContact(contactWithEventDetails);
    setContactLoading(false);
  };

  const deleteHandler = (contact) => {
    setDeleteContact(true);
    setSelectedContact(contact);
  };

  const addContactHandler = async () => {
    setSaveLoading(true);
    await addSubDocument({
      collectionName: FIRESTORE_COLLECTIONS.USERS,
      documentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
      document: {
        name: selectedContact?.name,
        phone: selectedContact?.phone,
      },
    });
    setSaveLoading(false);
    setAddContact(false);
    toast({
      title: "Contact Added Successfully",
    });
    listContactsHandler();
  };

  const updateContactHandler = async () => {
    setSaveLoading(true);
    for (const event of selectedContact.events) {
      if (!event.doc_id) {
        // Add new event in events
        const addRes = await addDocument({
          collectionName: FIRESTORE_COLLECTIONS.EVENTS,
          document: event,
        });

        const doc_id = addRes.id;
        event.doc_id = doc_id;

        // Add new event in user events
        await setSubDocument({
          collectionName: FIRESTORE_COLLECTIONS.USERS,
          documentId: authReducerState?.user?.email,
          subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
          subDocumentId: doc_id,
          document: { doc_id, contact_id: selectedContact.doc_id },
        });
      } else {
        await updateDocument({
          collectionName: FIRESTORE_COLLECTIONS.EVENTS,
          documentId: event.doc_id,
          document: event,
        });
      }
    }

    // Add new event in user contacts
    await setSubDocument({
      collectionName: FIRESTORE_COLLECTIONS.USERS,
      documentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
      subDocumentId: selectedContact.doc_id,
      document: {
        name: selectedContact?.name,
        phone: selectedContact?.phone,
        events: selectedContact?.events?.map((event) => event.doc_id),
      },
    });

    setSaveLoading(false);
    setEditContact(false);
    listContactsHandler();

    toast({
      title: "Contact Updated Successfully",
    });
  };

  const deleteContactHandler = async () => {
    setDeleteLoading(true);
    const contactDetails = await getEventDetails(selectedContact);
    if (contactDetails?.events?.length) {
      for (const event of contactDetails.events) {
        // Deleting event from user events
        await deleteSubDocument({
          collectionName: FIRESTORE_COLLECTIONS.USERS,
          parentDocumentId: authReducerState?.user?.email,
          subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
          subDocumentId: event?.doc_id,
        });

        // Deleting event from events
        await deleteDocument({
          collectionName: FIRESTORE_COLLECTIONS.EVENTS,
          documentId: event?.doc_id,
        });
      }
    }

    // Deleting the contact
    await deleteSubDocument({
      collectionName: FIRESTORE_COLLECTIONS.USERS,
      parentDocumentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
      subDocumentId: selectedContact?.doc_id,
    });

    setDeleteLoading(false);
    setDeleteContact(false);
    listContactsHandler();
    toast({ title: "Contact deleted successfully." });
  };

  const dialogCloseHandler = (type) => {
    setSelectedContact(null);
    if (type === constants.ADD_DIALOG) setAddContact(false);
    if (type === constants.EDIT_DIALOG) setEditContact(false);
    if (type === constants.DELETE_DIALOG) {
      setDeleteContact(false);
      setDeleteContactEvent(false);
    }
  };

  const addEventHandler = async (eventName, eventType) => {
    const newContactDetails = { ...selectedContact };

    let event = {
      event_type: eventType,
      event_name: eventName,
      event_date: null,
      event_id: Date.now(),
      user_email: authReducerState?.user?.email,
      contact_id: selectedContact?.doc_id,
    };
    if (!newContactDetails.events) newContactDetails.events = [event];
    else newContactDetails.events.push(event);

    setSelectedContact(newContactDetails);
  };

  const eventDateSelectHandler = (date, selectedEevent) => {
    const newContactDetails = { ...selectedContact };

    newContactDetails.events = newContactDetails.events.map((event) => {
      if (event.event_type === selectedEevent.event_type)
        event.event_date = date;
      return event;
    });
    setSelectedContact(newContactDetails);
  };

  const deleteContactEventHandler = async (deletedEvent) => {
    if (deletedEvent?.doc_id) {
      setDeleteLoading(true);
      // Deleting event from user events
      await deleteSubDocument({
        collectionName: FIRESTORE_COLLECTIONS.USERS,
        parentDocumentId: authReducerState?.user?.email,
        subCollectionName: FIRESTORE_COLLECTIONS.EVENTS,
        subDocumentId: deletedEvent.doc_id,
      });

      // Deleting event from events
      await deleteDocument({
        collectionName: FIRESTORE_COLLECTIONS.EVENTS,
        documentId: deletedEvent?.doc_id,
      });

      const newEvents = selectedContact?.events?.filter(
        (event) => event.doc_id !== deletedEvent.doc_id
      );

      // Deleting event from user contacts
      await setSubDocument({
        collectionName: FIRESTORE_COLLECTIONS.USERS,
        documentId: authReducerState?.user?.email,
        subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
        subDocumentId: selectedContact.doc_id,
        document: {
          name: selectedContact?.name,
          phone: selectedContact?.phone,
          events: newEvents?.map((event) => event.doc_id),
        },
      });

      const newSelectedContact = { ...selectedContact };

      newSelectedContact.events = newEvents;

      setDeleteLoading(false);
      setDeleteContactEvent(false);
      setSelectedContact(newSelectedContact);
    } else {
      const newEvents = selectedContact?.events?.filter(
        (event) => event.event_id !== deletedEvent.event_id
      );

      const newSelectedContact = { ...selectedContact };

      newSelectedContact.events = newEvents;

      setDeleteContactEvent(false);
      setSelectedContact(newSelectedContact);
    }
  };

  const refreshHandler = () => {
    listContactsHandler();
  };

  return {
    contacts,
    addContact,
    setAddContact,
    editContact,
    setEditContact,
    editHandler,
    deleteContact,
    setDeleteContact,
    deleteHandler,
    selectedContact,
    addContactHandler,
    updateContactHandler,
    deleteContactHandler,
    onChangeHandler,
    dialogCloseHandler,
    addEventHandler,
    eventDateSelectHandler,
    listLoading,
    contactLoading,
    saveLoading,
    deleteLoading,
    deleteContactEventHandler,
    refreshHandler,
    deleteContactEvent,
    setDeleteContactEvent,
  };
};

export default useContactsState;
