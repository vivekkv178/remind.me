"use client";
import Navbar from "@/components/UI/Navbar";

const MarketingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MarketingLayout;
