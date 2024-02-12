import React from "react";
import { FE_ROUTES } from "@/lib/constants";
import { Home, Users, CalendarCheck, Settings2 } from "lucide-react";

const routes = [
  {
    name: "Home",
    path: FE_ROUTES.HOME,
    icon: <Home />,
  },
  {
    name: "Manage Contacts",
    path: FE_ROUTES.CONTACTS,
    icon: <Users />,
  },
  {
    name: "Manage Events",
    path: FE_ROUTES.EVENTS,
    icon: <CalendarCheck />,
  },
  {
    name: "Preferences",
    path: FE_ROUTES.PREFERENCES,
    icon: <Settings2 />,
  },
];

export default routes;
