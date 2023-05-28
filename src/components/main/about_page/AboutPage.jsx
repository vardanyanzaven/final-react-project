import React, { useEffect } from "react";
import { aboutStyles } from "./styles";

import WhoWeAre from "../home/WhoWeAre";
import ContactUs from "../home/ContactUs";
import OurGallery from "./OurGallery";
import OurAdvantages from "./OurAdvantages";
import "./AboutUs.css";

const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <div>
      <WhoWeAre />
      <OurAdvantages />
      <OurGallery />
    </div>
  );
};

export default AboutPage;
