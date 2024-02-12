import React from "react";
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";

const techStack = [
  {
    content: "Next.js 14",
    svg: (
      <svg
        fill="none"
        height="20"
        viewBox="0 0 15 15"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m4.5 4.5.40534-.29275c-.12698-.17581-.35282-.24972-.55917-.183-.20636.06673-.34617.25888-.34617.47575zm3 9.5c-3.58985 0-6.5-2.9101-6.5-6.5h-1c0 4.1421 3.35786 7.5 7.5 7.5zm6.5-6.5c0 3.5899-2.9101 6.5-6.5 6.5v1c4.1421 0 7.5-3.3579 7.5-7.5zm-6.5-6.5c3.5899 0 6.5 2.91015 6.5 6.5h1c0-4.14214-3.3579-7.5-7.5-7.5zm0-1c-4.14214 0-7.5 3.35786-7.5 7.5h1c0-3.58985 2.91015-6.5 6.5-6.5zm-2.5 12v-7.5h-1v7.5zm-.90534-7.20725 6.50004 8.99995.8106-.5854-6.49996-9.00005zm5.90534-.79275v6h1v-6z"
          fill="#000"
        />
      </svg>
    ),
  },
  {
    content: "Tailwind CSS 3",
    svg: (
      <svg
        viewBox="0 0 32 32"
        x="0px"
        y="0px"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z"
          fill="#44a8b3"
        />
      </svg>
    ),
  },
];

export default function MadeWith() {
  return (
    <div
      id="cookies-simple-with-icon-and-dismiss-button"
      className="fixed bottom-0 end-0 z-[60] sm:max-w-sm w-auto mx-auto p-4"
    >
      <div className="px-2 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex mt-2">
            <div className=" pl-2 text-sm text-gray-800 dark:text-gray-200 mt- mr-2 font-bold">
              Built with
            </div>
            {techStack.map((tech, index) => (
              <div key={index} className="mr-1">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>{tech.svg}</TooltipTrigger>
                    <TooltipContent>
                      <p>{tech.content}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
              className="p-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border  border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-remove-element="#cookies-simple-with-icon-and-dismiss-button"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="flex-shrink-0 h-4 w-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* End Card */}
    </div>
  );
}
