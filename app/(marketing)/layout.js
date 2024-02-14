"use client";
import { MarketingLayout as Mlayout } from "@vivekkv178/library";
import useMarketingLayout from "./useMarketingLayout";
import Auth from "@/components/Auth";

const MarketingLayout = ({ children }) => {
  const { layoutProps } = useMarketingLayout();
  return (
    <>
      <Mlayout
        marketingHeaderProps={layoutProps?.marketingHeaderProps}
        mobileHeaderProps={layoutProps?.mobileHeaderProps}
      >
        {children}
      </Mlayout>
      <Auth />
    </>
  );
};

export default MarketingLayout;
