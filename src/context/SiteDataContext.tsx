import React, { createContext, useContext } from "react";
import rawSiteData from "@/data/siteData.json";
import { validateSiteData, type SiteDataSchemaType, type ValidationError } from "@/lib/siteDataSchema";
import SiteDataErrorOverlay from "@/components/SiteDataErrorOverlay";

const validationResult = validateSiteData(rawSiteData);

const validationErrors: ValidationError[] =
  validationResult.success === false ? validationResult.errors : [];

const siteData: SiteDataSchemaType =
  validationResult.success === true
    ? validationResult.data
    : (rawSiteData as unknown as SiteDataSchemaType);

const SiteDataContext = createContext<SiteDataSchemaType>(siteData);

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (validationErrors.length > 0) {
    return <SiteDataErrorOverlay errors={validationErrors} />;
  }

  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  );
};
