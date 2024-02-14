import React from "react";
import { FE_ROUTES } from "@/lib/constants";
import { Home, Users, CalendarCheck, Settings2 } from "lucide-react";

const routes = [
  {
    title: "Home",
    path: FE_ROUTES.HOME,
    icon: <Home className="h-6 w-6" />,
  },
  {
    title: "Manage Contacts",
    path: FE_ROUTES.CONTACTS,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Manage Events",
    path: FE_ROUTES.EVENTS,
    icon: <CalendarCheck className="h-6 w-6" />,
  },
  {
    title: "Preferences",
    path: FE_ROUTES.PREFERENCES,
    icon: <Settings2 className="h-6 w-6" />,
  },
];

export default routes;
