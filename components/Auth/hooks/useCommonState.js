import { useState } from "react";
import { SIGN_IN } from "../utils/constants";
import { getUser, signInWithGoogle } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { loginSuccess, toggleAuthDialog } from "@/lib/reducers/auth";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/lib/constants";

const useCommonState = () => {
  const [authComponent, setAuthComponent] = useState(SIGN_IN);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = async () => {
    await signInWithGoogle();
    const user = await getUser();
    dispatch(loginSuccess(user));
    dispatch(toggleAuthDialog(false));
    router.push(FE_ROUTES.HOME);
  };

  return { authComponent, handleSignIn, setAuthComponent };
};

export default useCommonState;
