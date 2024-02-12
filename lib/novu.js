import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_APP_ID);

export const addNovuSubscriber = async (email) => {
  try {
    const response = await novu.subscribers.identify(email, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const triggerNotification = async ({
  notificationEmail,
  subject,
  eventDescription,
  whatsappNumber,
  whatsappText,
  username,
}) => {
  await novu.trigger("dev", {
    to: {
      subscriberId: notificationEmail,
    },
    payload: {
      subject,
      eventDescription,
      whatsappNumber,
      whatsappText,
      username,
    },
  });
};
