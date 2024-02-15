import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import {
  getSubDocument,
  listDocumentsFromCollection,
} from "@/lib/firebaseAdmin";
import { triggerNotification } from "@/lib/novu";

const getContactDetails = async (event) => {
  const contactDetails = await getSubDocument({
    collectionName: FIRESTORE_COLLECTIONS.USERS,
    parentDocumentId: event?.user_email,
    subCollectionName: FIRESTORE_COLLECTIONS.CONTACTS_SUB_COLLECTION,
    subDocumentId: event?.contact_id,
  });

  return contactDetails;
};

const messages = {
  birthday: "Happy Birthday {{name}}!!! 🎉🎂✨🍰🥳💐",
  wedding: "Happy Wedding Anniversary {{name}}!!! 🎉🎂✨🍰🥳💐",
};

const checkTrigger = (event) => {
  const eventDate = new Date(event?.event_date?.seconds * 1000);
  const today = new Date();
  return (
    today.getMonth() === eventDate.getMonth() &&
    today.getDate() === eventDate.getDate()
  );
};

const triggerRemindersService = () => {
  return new Promise(async (resolve, reject) => {
    const events = await listDocumentsFromCollection(
      FIRESTORE_COLLECTIONS.EVENTS
    );
    events.forEach(async (event) => {
      console.log(event);
      if (checkTrigger(event))
        if (event.contact_id) {
          const contactDetails = await getContactDetails(event);
          await triggerNotification({
            notificationEmail: event.user_email,
            subject: `${contactDetails?.name} - ${event.event_name}`,
            eventDescription: `${contactDetails?.name} - ${event.event_name}`,
            whatsappNumber: contactDetails?.phone?.replaceAll("+", ""),
            whatsappText: messages[event.event_type].replaceAll(
              "{{name}}",
              contactDetails?.name
            ),
            username: event?.user_email?.split("@")[0],
          });
        } else {
          await triggerNotification({
            notificationEmail: event.user_email,
            subject: event.event_name,
            eventDescription: event.event_name,
            whatsappNumber: "",
            whatsappText: "",
            username: event?.user_email?.split("@")[0],
          });
        }
    });
    resolve("Success");
  });
};

export default triggerRemindersService;
