"use client";
import routes from "@/components/Sidebar/utils/routes";
import Profile from "@/components/UI/Profile";
import { APP_CONSTANTS } from "@/lib/constants";
import { toggleAuthDialog } from "@/lib/reducers/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const layout = {
  marketingHeaderProps: {
    authenticated: false,
    brandName: APP_CONSTANTS.BRAND_NAME,
    brandLogo: APP_CONSTANTS.BRAND_LOGO,
    marketingRoutes: [
      { name: "Features", path: "/features" },
      { name: "Home", path: "/home", private: true },
    ],
    loginHandler: () => alert("Login Clicked"),
    NavigationComponent: Link,
    profileComponent: <Profile />,
  },
  mobileHeaderProps: {
    routes: [
      {
        title: "Home",
        path: "/home",
      },
      {
        title: "Login",
        path: "#",
        customClick: true,
      },
    ],
    NavigationComponent: Link,
    authHandler: () => {},
    authenticated: true,
    profileComponent: <Profile />,
  },
};

const useMarketingLayout = () => {
  const dispatch = useDispatch();
  const authReducerState = useSelector((state) => state.auth);

  const [layoutProps, setLayoutProps] = useState(layout);

  const pathName = usePathname();

  const loginHandler = () => {
    dispatch(toggleAuthDialog(true));
  };

  const setCurrentRoute = () => {
    const currentRoute = routes.filter((route) => route.path === pathName)[0];
    const newLayoutProps = { ...layoutProps };

    newLayoutProps.marketingHeaderProps.loginHandler = loginHandler;
    const authenticated = authReducerState?.user ? true : false;
    newLayoutProps.marketingHeaderProps.authenticated = authenticated;
    newLayoutProps.mobileHeaderProps.authenticated = authenticated;
    newLayoutProps.mobileHeaderProps.authHandler = loginHandler;
    newLayoutProps.mobileHeaderProps.currentRoutePath = currentRoute?.path;

    setLayoutProps(newLayoutProps);
  };

  useEffect(() => {
    setCurrentRoute();
  }, [pathName, authReducerState]);

  return { layoutProps };
};

export default useMarketingLayout;
