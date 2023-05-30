import { ServicesPage } from "./ServicesPage";
import React from "react";
import { useEffect } from "react";
import ServicesIntro from "./ServicesIntro";
import FAQ from "./Faq";

export const Services = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, [setActiveLinkId]);

  return (
    <div className="homepage-slider">
      <ServicesPage/>
      <ServicesIntro />
      <FAQ />
    </div>
  );
};
