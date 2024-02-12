"use client";
import useHomeState from "./useHomeState";
import Event from "./Event";
import { Loader2 } from "lucide-react";

const Home = () => {
  const homeState = useHomeState();
  return (
    <header>
      <p className="mb-2 text-sm font-semibold text-blue-600">
        Events this month
      </p>
      {homeState?.listLoading ? (
        <div className="grid place-items-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {homeState?.events?.length
              ? homeState?.events?.map((event, index) => (
                  <Event key={index} event={event} />
                ))
              : null}
          </div>
        </div>
      )}
    </header>
  );
};

export default Home;
