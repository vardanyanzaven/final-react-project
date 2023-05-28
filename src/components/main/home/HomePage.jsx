import React from "react";
import HomePageSlider from "./HomePageSlider";
import ContactUsInput from "./ContactUs";
import WhoWeAre from "./WhoWeAre";
import HowWeWork from "./HowWeWork";
import WhatWeDo from "./WhatWeDo";

export const HomePage = () => {
  return (
    <div className="homepage-slider">
      <HomePageSlider />
      <WhatWeDo />
      <WhoWeAre />
      <HowWeWork />
      <ContactUsInput />
    </div>
  );
};
