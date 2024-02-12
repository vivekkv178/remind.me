import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import {
  addDocument,
  deleteDocument,
  deleteSubDocument,
  getDocument,
  getSubDocument,
  listSubCollection,
  setSubDocument,
  updateDocument,
} from "@/lib/firestore";
import { useEffect, useState } from "react";
import { constants } from "../utils/constants";
import { useSelector } from "react-redux";
import { toast } from "@/components/UI/use-toast";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/urls";

const useEventsState = () => {
  const [events, setEvents] = useState([]);
  const [addEvent, setAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const authReducerState = useSelector((state) => state.auth);

  const onChangeHandler = (event) => {
    const newEventDetails = { ...selectedEvent };
    newEventDetails[event.target.name] = event.target.value;
    setSelectedEvent(newEventDetails);
  };

  const eventDateSelectHandler = (date) => {
    const newEventDetails = { ...selectedEvent };
    newEventDetails.event_date = date;
    setSelectedEvent(newEventDetails);
  };

  const editHandler = (event) => {
    setEditEvent(true);
    setSelectedEvent(event);
  };

  const deleteHandler = (event) => {
    setDeleteEvent(true);
    setSelectedEvent(event);
  };

  const addEventHandler = async () => {
    setSaveLoading(true);

    //Adding in events
    const addEventRes = await addDocument({
      collectionName: FIRESTORE_COLLECTIONS.EVENTS,
      document: {
        event_name: selectedEvent.event_name,
        event_date: selectedEvent.event_date,
        event_type: "General",
        user_email: authReducerState?.user?.email,
      },
    });

    const doc_id = addEventRes.id;

    //Adding in user events
    await setSubDocument({
      collectionName: FIRESTORE_COLLECTIONS.USERS,
      documentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
      subDocumentId: doc_id,
      document: {
        doc_id,
      },
    });

    setSaveLoading(false);
    setAddEvent(false);
    listEventsHandler();

    toast({
      title: "Event added Successfully",
    });
  };

  const updateEventHandler = async () => {
    setSaveLoading(true);
    await updateDocument({
      collectionName: FIRESTORE_COLLECTIONS.EVENTS,
      documentId: selectedEvent?.doc_id,
      document: {
        event_name: selectedEvent.event_name,
        event_date: selectedEvent.event_date,
      },
    });
    setSaveLoading(false);
    setEditEvent(false);
    listEventsHandler();
  };

  const deleteEventHandler = async () => {
    setDeleteLoading(true);

    await deleteDocument({
      collectionName: FIRESTORE_COLLECTIONS.EVENTS,
      documentId: selectedEvent?.doc_id,
    });

    await deleteSubDocument({
      collectionName: FIRESTORE_COLLECTIONS.USERS,
      parentDocumentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
      subDocumentId: selectedEvent?.doc_id,
    });

    setDeleteLoading(false);
    setDeleteEvent(false);
    listEventsHandler();
  };

  const getEventDetails = async (userEvents) => {
    const events = [];
    for (const event of userEvents) {
      const getRes = await getDocument({
        collectionName: FIRESTORE_COLLECTIONS.EVENTS,
        documentId: event?.doc_id,
      });
      events.push({ ...getRes, ...event });
    }
    userEvents.events = events;
    return events;
  };

  const getContactDetails = async (userEvents) => {
    const events = [];
    for (const event of userEvents) {
      if (event.contact_id) {
        const getRes = await getSubDocument({
          collectionName: FIRESTORE_COLLECTIONS.USERS,
          parentDocumentId: authReducerState?.user?.email,
          subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
          subDocumentId: event.contact_id,
        });
        events.push({ ...getRes, ...event });
      } else {
        events.push(event);
      }
    }
    userEvents.events = events;
    return events;
  };

  const listEventsHandler = async () => {
    setListLoading(true);
    const eventsList = await listSubCollection({
      parentCollectionName: FIRESTORE_COLLECTIONS.USERS,
      parentDocumentId: authReducerState?.user?.email,
      subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
    });

    let events = await getEventDetails(eventsList);
    let eventsWithContacts = await getContactDetails(events);

    setEvents(
      eventsWithContacts.sort(
        (a, b) => a.event_date?.seconds - b.event_date?.seconds
      )
    );
    setListLoading(false);
  };

  useEffect(() => {
    if (authReducerState?.user) listEventsHandler();
  }, [authReducerState?.user]);

  const dialogCloseHandler = (type) => {
    setSelectedEvent(null);
    if (type === constants.ADD_DIALOG) setAddEvent(false);
    if (type === constants.EDIT_DIALOG) setEditEvent(false);
    if (type === constants.DELETE_DIALOG) setDeleteEvent(false);
  };

  const refreshHandler = () => {
    listEventsHandler();
  };

  const notficationsHandler = () => {
    axios
      .post(API_ENDPOINTS.TRIGGER_REMINDERS, {})
      .then(function (response) {
        toast({
          title: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return {
    events,
    addEvent,
    setAddEvent,
    editEvent,
    setEditEvent,
    editHandler,
    deleteEvent,
    setDeleteEvent,
    deleteHandler,
    selectedEvent,
    addEventHandler,
    updateEventHandler,
    deleteEventHandler,
    onChangeHandler,
    dialogCloseHandler,
    listLoading,
    contactLoading,
    saveLoading,
    deleteLoading,
    eventDateSelectHandler,
    refreshHandler,
    notficationsHandler,
  };
};

export default useEventsState;
