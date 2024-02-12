"use client";

import { FIRESTORE_COLLECTIONS } from "@/lib/constants";
import { getUser } from "@/lib/firebase";
import { getDocument } from "@/lib/firestore";
import { loginSuccess } from "@/lib/reducers/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserProvider({ children }) {
  const authReducerState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const user = await getUser();
    if (user) {
      const userPreferences = await getDocument({
        collectionName: FIRESTORE_COLLECTIONS.USERS,
        documentId: user?.email,
      });
      user.userPreferences = userPreferences;
      dispatch(loginSuccess(user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
}
