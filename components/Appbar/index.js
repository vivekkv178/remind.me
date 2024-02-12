import React from "react";
import { ModeToggle } from "../UI/ModeToggle";
import Profile from "../UI/Profile";
import Link from "next/link";

const Appbar = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <div className="me-5 lg:me-0 lg:hidden">
          <Link
            href={"/"}
            className="flex-none text-xl font-semibold dark:text-white"
            aria-label="Brand"
          >
            Brand
          </Link>
        </div>
        <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          {/* Below div is needed to push the last div to the right  */}
          <div></div>
          <div className="flex flex-row items-center justify-end gap-2">
            <ModeToggle />
            <Profile />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Appbar;
