import React from "react";
import Link from "next/link";
import ToggleNavigation from "./components/ToggleNavigation";
import { FE_ROUTES } from "@/lib/constants";
import routes from "./utils/routes";
import useSidebarState from "./hooks/useSidebarState";

const Sidebar = () => {
  const { currentRoute } = useSidebarState();
  const selectedClass =
    "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";
  const unselectedClass =
    "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";
  return (
    <>
      <ToggleNavigation />
      <div
        id="application-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-6">
          <Link
            href={FE_ROUTES.ROOT}
            className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            aria-label="Brand"
          >
            remind.me
          </Link>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  className={
                    currentRoute === route.path
                      ? selectedClass
                      : unselectedClass
                  }
                  href={route.path}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
