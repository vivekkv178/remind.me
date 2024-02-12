import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
    },
  });
};
