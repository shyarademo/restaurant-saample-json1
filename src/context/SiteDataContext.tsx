import React, { createContext, useContext } from "react";
import siteData from "@/data/siteData.json";

type SiteData = typeof siteData;

const SiteDataContext = createContext<SiteData>(siteData);

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  );
};
