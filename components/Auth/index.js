"use client";
import React from "react";
import Auth from "./Auth";
import { AuthProvider } from "./context/context";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}
