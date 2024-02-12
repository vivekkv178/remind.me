import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
import { useAuthContext } from "./context/context";
import { FORGOT, SIGN_IN, SIGN_UP } from "./utils/constants";
import { Dialog, DialogContent } from "@/components/UI/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthDialog } from "@/lib/reducers/auth";

export default function Auth() {
  const { commonState } = useAuthContext();
  const authReducerState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={authReducerState.authDialog}
      onOpenChange={() => dispatch(toggleAuthDialog(false))}
    >
      <DialogContent>
        {commonState?.authComponent === SIGN_IN && <SignIn />}
        {commonState?.authComponent === SIGN_UP && <SignUp />}
        {commonState?.authComponent === FORGOT && <Forgot />}
      </DialogContent>
    </Dialog>
  );
}
