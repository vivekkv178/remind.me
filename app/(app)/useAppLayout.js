"use client";
import routes from "@/components/Sidebar/utils/routes";
import Profile from "@/components/UI/Profile";
import { APP_CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const layout = {
  appHeaderProps: {
    brandLogo: APP_CONSTANTS.BRAND_LOGO,
    brandName: APP_CONSTANTS.BRAND_NAME,
    currentRouteName: "Name",
    NavigationComponent: Link,
    profileComponent: <Profile />,
  },
  sidebarProps: {
    sidebarRoutes: routes,
    NavigationComponent: Link,
    brandLogo: APP_CONSTANTS.BRAND_LOGO,
    brandName: APP_CONSTANTS.BRAND_NAME,
    currentRoutePath: "/",
  },
  mobileHeaderProps: {
    routes: routes,
    NavigationComponent: Link,
    currentRoutePath: "/",
  },
};

const useAppLayout = () => {
  const [layoutProps, setLayoutProps] = useState(layout);

  const pathName = usePathname();

  const setCurrentRoute = () => {
    const currentRoute = routes.filter((route) => route.path === pathName)[0];
    const newLayoutProps = { ...layoutProps };

    newLayoutProps.appHeaderProps.currentRouteName = currentRoute?.title;
    newLayoutProps.sidebarProps.currentRoutePath = currentRoute?.path;
    newLayoutProps.mobileHeaderProps.currentRoutePath = currentRoute?.path;

    setLayoutProps(newLayoutProps);
  };

  useEffect(() => {
    setCurrentRoute();
  }, [pathName]);

  return { layoutProps };
};

export default useAppLayout;
