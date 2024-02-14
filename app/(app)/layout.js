"use client";

import withAuth from "@/lib/withAuth";
import { AppLayout as ApplicationLayout } from "@vivekkv178/library";
import useAppLayout from "./useAppLayout";

const AppLayout = ({ children }) => {
  const { layoutProps } = useAppLayout();
  return (
    <ApplicationLayout
      appHeaderProps={layoutProps?.appHeaderProps}
      sidebarProps={layoutProps?.sidebarProps}
      mobileHeaderProps={layoutProps?.mobileHeaderProps}
    >
      {children}
    </ApplicationLayout>
  );
};

export default withAuth(AppLayout);
