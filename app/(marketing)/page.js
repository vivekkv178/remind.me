"use client";
import {
  CalendarCheck,
  Bell,
  Globe,
  ListChecks,
  RefreshCcwDot,
  User,
} from "lucide-react";

const Marketing = () => {
  return (
    <>
      {/* Hero */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        {/* Title */}
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Stay organized with remind.me
          </h1>
        </div>
        {/* End Title */}
        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-black">
            Our reminder app helps you manage tasks efficiently. Keep track of
            important events and deadlines effortlessly
          </p>
        </div>
        {/* Buttons */}
        <div className="text-center">
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black py-3 px-6 dark:focus:ring-offset-gray-800"
            href="/home"
          >
            Get started
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
        {/* End Buttons */}
      </div>
      {/* End Hero */}

      {/* Icon Blocks */}
      <div
        className="max-w-[85rem] px-4 py-10 h-screen sm:px-6  lg:px-8 lg:py-14 mx-auto"
        id="features"
      >
        <div className="max-w-4xl mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                <CalendarCheck className="h-16 w-16" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Stay Organized
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Effortlessly organize your tasks and appointments. Our app
                    helps you stay on top of your schedule.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <RefreshCcwDot className="h-16 w-16" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Easy Updates
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Receive automatic updates for all your reminders. Keep your
                    tasks up-to-date with ease.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <Bell className="h-16 w-16" />

                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Never Miss a Deadline
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Set deadlines and receive timely reminders. Our app ensures
                    you never miss an important task or event.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                <ListChecks className="h-16 w-16" />

                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Simple Task Management
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Manage your tasks efficiently. Our app allows you to
                    prioritize and organize your to-dos effortlessly.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <User className="h-16 w-16" />

                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Personalized Experience
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Customize your reminders to suit your preferences. Enjoy a
                    personalized experience tailored to your needs.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                <Globe className="h-16 w-16" />

                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Access Anywhere, Anytime
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Access your reminders from anywhere, at any time. Our app
                    ensures you stay organized no matter where you are.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
};

export default Marketing;
