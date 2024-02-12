"use client";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "./constants";
import { useEffect, useState } from "react";
import { getUser } from "./firebase";

const withAuth = (Component) => {
  return function WithAuth(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    const checkUser = async () => {
      const user = await getUser();
      if (!user) {
        router.push(FE_ROUTES.ROOT);
      } else {
        setAuthenticated(true);
      }
    };

    useEffect(() => {
      checkUser();
    }, []);

    return authenticated ? <Component {...props} /> : <></>;
  };
};

export default withAuth;
