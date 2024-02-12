"use client";

import Appbar from "@/components/Appbar";
import Sidebar from "@/components/Sidebar";
import withAuth from "@/lib/withAuth";
import { Toaster } from "@/components/UI/Toaster";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Appbar />
      <Sidebar />
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default withAuth(AppLayout);
