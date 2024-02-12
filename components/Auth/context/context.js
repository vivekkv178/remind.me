"use client";
import { createContext, useContext } from "react";
import useCommonState from "../hooks/useCommonState";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const commonState = useCommonState();
  return (
    <AuthContext.Provider value={{ commonState }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
