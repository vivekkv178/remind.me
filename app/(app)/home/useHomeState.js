import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import { getDocument, listSubCollection } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useHomeState = () => {
  const [events, setEvents] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const authReducerState = useSelector((state) => state.auth);

  const getEventDetails = async (eventsData) => {
    let events = [];
    const today = new Date();
    for (const event of eventsData) {
      const getRes = await getDocument({
        collectionName: FIRESTORE_COLLECTIONS.EVENTS,
        documentId: typeof event === "string" ? event : event?.doc_id,
      });

      const eventDate = new Date(getRes?.event_date?.seconds * 1000);

      if (today.getMonth() === eventDate.getMonth()) events.push(getRes);
    }

    return events;
  };

  useEffect(() => {
    const listEvents = async () => {
      setListLoading(true);
      const data = await listSubCollection({
        parentCollectionName: FIRESTORE_COLLECTIONS.USERS,
        parentDocumentId: authReducerState?.user?.email,
        subCollectionName: FIRESTORE_COLLECTIONS.EVENTS_SUB_COLLECTION,
      });

      const eventsData = await getEventDetails(data);
      setListLoading(false);

      setEvents(eventsData);
    };

    if (authReducerState?.user?.email) listEvents();
  }, [authReducerState?.user]);

  return { events, setEvents, listLoading };
};

export default useHomeState;
