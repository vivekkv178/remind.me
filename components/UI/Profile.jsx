/* eslint-disable @next/next/no-img-element */
import { signOut } from "@/lib/firebase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/lib/constants";
import { logoutSuccess } from "@/lib/reducers/auth";
import { CircleUserRound, Power } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

const Profile = () => {
  const authReducerState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut();
    router.push(FE_ROUTES.ROOT);
    dispatch(logoutSuccess());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {authReducerState?.user?.photoURL ? (
          <img
            className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
            src={authReducerState?.user?.photoURL}
            alt="Image Description"
          />
        ) : (
          <CircleUserRound />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
              {authReducerState?.user?.displayName}
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
              {authReducerState?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOutHandler}>
            <Power className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
